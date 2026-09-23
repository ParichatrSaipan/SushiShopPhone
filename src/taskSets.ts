export type TaskNo = 1 | 2
export type SetId = 'A' | 'B' | 'C'

export interface TargetLine {
  itemId: string
  qty: number
}

export interface TaskSetDef {
  task: TaskNo
  set: SetId
  lines: TargetLine[]
}

/**
 * ชุดโจทย์สำหรับงานวิจัย
 * itemId อ้างอิงรูปแบบ `${groupId}-${index}` ตามที่ menuData.ts สร้างด้วย makeItems()
 * Task 1 = 2 รายการ / รวม 3 หน่วย
 * Task 2 = 5 รายการ / รวม 7 หน่วย
 */
export const TASK_SETS: readonly TaskSetDef[] = [
  // Task 1 — Easy
  {
    task: 1,
    set: 'A',
    lines: [
      { itemId: 'tuna-salmon-3', qty: 2 }, // แซลมอน
      { itemId: 'desserts-1', qty: 1 }, // กาแฟลาเต้ร้อน (ไม่ใส่น้ำตาล)
    ],
  },
  {
    task: 1,
    set: 'B',
    lines: [
      { itemId: 'tuna-salmon-1', qty: 2 }, // มะกุโระ
      { itemId: 'desserts-2', qty: 1 }, // กาแฟดำร้อน (ไม่ใส่น้ำตาล)
    ],
  },
  {
    task: 1,
    set: 'C',
    lines: [
      { itemId: 'shrimp-crab-shellfish-1', qty: 2 }, // กุ้งเอบิ
      { itemId: 'desserts-3', qty: 1 }, // กาแฟลาเต้เย็น (ไม่ใส่น้ำตาล)
    ],
  },

  // Task 2 — Complex
  {
    task: 2,
    set: 'A',
    lines: [
      { itemId: 'tuna-salmon-6', qty: 2 }, // ท้องแซลมอนเบิร์นไฟ
      { itemId: 'squid-octopus-eel-6', qty: 2 }, // อุนางิย่าง
      { itemId: 'tuna-salmon-22', qty: 1 }, // แซลมอนอะโวคาโดโรล
      { itemId: 'meat-egg-other-7', qty: 1 }, // ข้าวโพดมาโย
      { itemId: 'sides-1', qty: 1 }, // ฮอกไกโดมิลล์เครป
    ],
  },
  {
    task: 2,
    set: 'B',
    lines: [
      { itemId: 'tuna-salmon-2', qty: 2 }, // ซึเกะมะกุโระ
      { itemId: 'shrimp-crab-shellfish-14', qty: 2 }, // หอยเชลล์ซอสเบซิลเลมอน
      { itemId: 'shrimp-crab-shellfish-18', qty: 1 }, // ซูชิกุ้งเทมปุระ
      { itemId: 'meat-egg-other-5', qty: 1 }, // อินาริยัดไส้ไข่และเนื้อ
      { itemId: 'sides-4', qty: 1 }, // โรลเค้ก
    ],
  },
  {
    task: 2,
    set: 'C',
    lines: [
      { itemId: 'tuna-salmon-10', qty: 2 }, // แซลมอนชิโอะยูกเกะ
      { itemId: 'squid-octopus-eel-7', qty: 2 }, // อานาโกะเบิร์นไฟ
      { itemId: 'tuna-salmon-12', qty: 1 }, // ทูน่าสับมากิ
      { itemId: 'shrimp-crab-shellfish-15', qty: 1 }, // กุ้งเบิร์นชีส
      { itemId: 'sides-3', qty: 1 }, // เค้กช็อคโกแลต
    ],
  },
]

export function findTaskSet(task: TaskNo, set: SetId): TaskSetDef | undefined {
  return TASK_SETS.find((t) => t.task === task && t.set === set)
}
