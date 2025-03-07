import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  // PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  // rectIntersection,
  getFirstCollision,
  closestCenter
} from '@dnd-kit/core'
import { useCallback, useEffect, useState, useRef } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'

import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  // https://docs.dndkit.com/api-documentation/sensors
  // Nếu dùng PointerSensor thì cần phải sử dụng kết hợp thuộc tính CSS touch-action: none ở những phần tử
  // kéo thả- nhưng mà còn bug
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  // Require the mouse to move by 10 pixels before activating
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  // Press delay of 250ms, with tolerance of 500px of movement
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
  // Ưu tiên sử dụng kết hợp 2 loại sensors là mouse và touch để có trải nghiệm trên mobile tốt nhất,
  // không bị bug
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  // Cùng một thời điểm chỉ có một phần tử được kéo (col or card)
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  // Điểm va chạm cuối cùng trước đó (xử lý thuật toán phát hiện va chạm)
  const lastOverId = useRef(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, 'id'))
  }, [board])

  // Tìm một cái column theo CardId
  const findColumnByCardId = (cardId) => {
    // Đoạn này nên dùng column.card thay vì column.cardOrderdIds bởi vì ở bước handleDragOver chúng ta sẽ
    // làm dữ liệu cho cards hoàn chỉnh trước rồi mới tạo ra cardOrderdIds mới.
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  // Function chung xử lý cập nhật lại state trong TH di chuyển Card giữa các Column khác nhau
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns(prevColumns => {
      // Tìm vị trí của overCard trong column đích (nơi activeCard sắp được thả)
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

      // Logic tính toán cardIndex mới (trên or dưới overCard) lấy chuẩn ra từ code của thư viện @@ khó hiểu
      let newCardIndex
      const isBelowOverItem = active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      // CLone mảng OrderedColumns cũ ra một cái mới để xử lý data rồi return - cập nhật
      // lại OderedColumns mới
      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      // nextActiveColumn: Column cũ
      if (nextActiveColumn) {
        // Xoá card ở cái column active (cũng có thể hiểu là column cũ, cái lúc mà kéo card ra khỏi nó để
        // sang column khác)
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
        // Thêm placeholder card nếu column rỗng: card bị kéo hết đi
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }
        // Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }

      // nextOverColumn: Column mới
      if (nextOverColumn) {
        // Kiểm tra xem card đang kéo nó có tồn tại ở overColumn chưa, nếu có thì cần xoá nó trước
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
        //Phải cập nhật lại chuẩn dữ liệu columnId trong card sau khi kéo card giữa 2 olumn khác nhau
        const rebuild_activeDraggingCardData = { ...activeDraggingCardData, columnId: nextOverColumn._id }
        // Tiếp theo là thêm cái card đang kéo vào overColumn theo vị trí index mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)
        // Xoá cái Placeholder Cảd đi nếu nó đang tồn tại
        nextOverColumn.cards = nextOverColumn.cards.filter(card => !card?.FE_PlaceholderCard)

        // Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }

      return nextColumns
    })
  }

  // Trigger khi bắt đầu kéo (drag) một phần tử
  const handleDragStart = (event) => {
    // console.log('handleDragStart', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD :
      ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)

    // Nếu là kéo card thì mới thực hiện những hành động set giá trị oldColumn
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  // Trigger khi đang kéo (drag) một phần tử
  const handleDragOver = (event) => {
    // Không làm gì thêm nếu đang kéo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) { return }

    // Nếu đang kéo card
    // console.log('handleDragOver: ', event)
    const { active, over } = event
    // Cần đảm bảo nếu không tồn tại acitve hoặc over (khi kéo ra khỏi container) thì không làm gì
    // tránh crash trang
    if (!active || !over) return

    // activeDraggingCard: là cái card đang được kéo
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    // overCard: là cái card đang tương tác trên hoặc dưới so với cái card đang được kéo ở trên
    const { id: overCardId } = over

    // TÌm 2 cái columns theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    // Nếu không tồn tại 1 trong 2 cái column thì không làm gì, tránh crash trang web
    if (!activeColumn || !overColumn) return

    // Xử lý logic ở đây chỉ khi kéo card qua 2 column khác nhau, cò nếu kéo card tron chính column ban đầu
    // của nó thì không làm gì
    // Vì đây đang là đoạn xử lý lúc kéo (handleDragOver), còn xử lý lúc kéo xong xuôi thì nó lại là vấn đề khác
    // (ở handleDragEnd)
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )
    }
  }

  // Trigger khi kết thúc hành động kéo (drag) một phần tử => hành động thả (drop)
  const handleDragEnd = (event) => {
    // console.log('handleDragEnd: ', event)
    const { active, over } = event
    // Cần đảm bảo nếu không tồn tại acitve hoặc over (khi kéo ra khỏi container) thì không làm gì
    // tránh crash trang
    if (!active || !over) return

    // Xử lý kéo thả Cards
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // activeDraggingCard: là cái card đang được kéo
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      // overCard: là cái card đang tương tác trên hoặc dưới so với cái card đang được kéo ở trên
      const { id: overCardId } = over

      // TÌm 2 cái columns theo cardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      // Nếu không tồn tại 1 trong 2 cái column thì không làm gì, tránh crash trang web
      if (!activeColumn || !overColumn) return

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      } else {
        //Lấy vị trí cũ (từ thằng oldColumnWhenDraggingCard)
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(card => card._id === activeDragItemId)
        //Lấy vị trí mới (từ thằng over)
        const newCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)

        // Dùng để xử lý gọi API
        // const dndColumnOrderIds = dndOrderedColumns.map(column => column._id)
        // console.log(dndColumnOrderIds)
        // Cập nhật lại state sau khi kéo thả
        setOrderedColumns(prevColumns => {
          // CLone mảng OrderedColumns cũ ra một cái mới để xử lý data rồi return - cập nhật
          // lại OderedColumns mới
          const nextColumns = cloneDeep(prevColumns)
          // Tìm tới cái Column mà chúng ta đang thả
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)
          // Cập nhật lại 2 gaid trị mới là card và cardOrderIds trong cái targetColumn
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)

          // Trả về giá trị state mới (chuẩn vị trí)
          return nextColumns
        })
      }
    }

    // Xử lý kéo thả Column trong một cái BoardContent
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      //Nếu vị trí sau khi kéo thả khác vị trí ban đầu
      if (active.id !== over.id) {
        //Lấy vị trí cũ (từ thằng active)
        const oldColumnIndex = orderedColumns.findIndex(column => column._id === active.id)
        //Lấy vị trí mới (từ thằng over)
        const newColumnIndex = orderedColumns.findIndex(column => column._id === over.id)
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)

        // Dùng để xử lý gọi API
        // const dndColumnOrderIds = dndOrderedColumns.map(column => column._id)
        // console.log(dndColumnOrderIds)
        // Cập nhật lại state sau khi kéo thả
        setOrderedColumns(dndOrderedColumns)
      }
    }

    // Những dữ liệu sau khi kéo thả luôn phải đưa về giá trị null mặc định ban đầu
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }

  // Animation khi thả (drop) một phần tử - Test bằng cách kéo xong thả trực tiếp và nhìn phần tử giữ chỗ Overplay
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: 0.5 } } })
  }

  // Custom lại chiến lược / thuật toán phát hiện va chạm tối ưu cho việc kéo thả card giữa nhiều column
  // args = arguments = các đối số, tham số
  const collisionDetectionStrategy = useCallback((args) => {
    // TH kéo column thì dùng thuật toán closestCorners là chuẩn nhất
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }
    // Tìm các điểm giao nhau, va chạm intersection với con trỏ
    const pointerIntersections = pointerWithin(args)

    if (!pointerIntersections?.length) return

    // const pointerIntersections = pointerWithin(args)
    // const intersection = !!pointerIntersections?.length
    //   ? pointerIntersections
    //   : rectIntersection(args)

    // Tìm overId đầu tiên trong đám pointerIntersections ở trên
    let overId = getFirstCollision(pointerIntersections, 'id')
    if (overId) {
      const checkColumn = orderedColumns.find(column => column._id === overId)
      if (checkColumn) {
        overId = closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => {
            return (container.id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id))
          })
        })[0]?.id
      }

      lastOverId.current = overId
      return [{ id: overId }]
    }

    // Nếu overId là null thì trả về mảng rỗng - tránh bug crash trang
    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }, [activeDragItemType])

  return (
    <DndContext
      sensors={sensors}
      // Thuật toán phát hiện va chạm (nếu không có nó thì card với cover lớn sẽ không kéo qua Column được
      // vì lúc này nó đang bị conflict giữa card và column), dùng closestCorners thay vì closestCenter
      // https://docs.dndkit.com/api-documentation/context-provider/collision-detection-algorithms
      // Update: Nếu chỉ dùng closestCorners sẽ có bug flickering + sai lệch dữ liệu
      // collisionDetection={closestCorners}
      // Tự custom nâng cao thuật toán phát hiện va chạm
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box sx={{
        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
