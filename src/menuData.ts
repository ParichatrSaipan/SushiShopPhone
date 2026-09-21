export type MenuItem = {
  id: string
  thai: string
  english: string
  price: number
}

export type MenuGroup = {
  id: string
  label: string
  shortLabel: string
  english: string
  image: string
  items: MenuItem[]
}

export const mainCategories = [
  { id: 'top', label: 'TOP' },
  { id: 'seasonal', label: 'เมนูแนะนำตามช่วงเวลา' },
  { id: 'today', label: 'เมนูแนะนำวันนี้' },
  { id: 'nigiri', label: 'นิกิริ' },
  { id: 'roll', label: 'กุ้ง กั้ง โรล' },
  { id: 'noodles', label: 'เมนูเส้น ซุป' },
  { id: 'sides', label: 'เมนูทานเล่น' },
  { id: 'desserts', label: 'ของหวาน เครื่องดื่ม' },
] as const

export type MainCategoryId = (typeof mainCategories)[number]['id']

const makeItems = (
  groupId: string,
  entries: Array<[string, string, number]>,
): MenuItem[] =>
  entries.map(([thai, english, price], index) => ({
    id: `${groupId}-${index + 1}`,
    thai,
    english,
    price,
  }))

export const nigiriGroups: MenuGroup[] = [
  {
    id: 'tuna-salmon',
    label: 'มากุโระ แซลมอน',
    shortLabel: 'ทูน่า แซลมอน',
    english: 'Tuna / Salmon',
    image:
      'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=400&q=85',
    items: makeItems('tuna-salmon', [
      ['มะกุโระ', 'Tuna', 2.6],
      ['ซึเกะมะกุโระ', 'Tuna Marinated in Soy Sauce', 2.6],
      ['แซลมอน', 'Salmon', 2.6],
      ['โทโระแซลมอน', 'Salmon Belly', 2.6],
      ['แซลมอนหัวหอม', 'Salmon with Onion', 2.6],
      ['แซลมอนโทโระ อาบุริ', 'Broiled Salmon Belly', 2.6],
      [
        'แซลมอนโทโระ อาบุริ + หัวไชเท้า',
        'Broiled Salmon Belly with Radish',
        2.6,
      ],
      ['ห่อยูกเกะมะกุโระ', 'Tuna Yukke Wrap', 2.6],
      ['ห่อยูกเกะแซลมอน', 'Salmon Yukke Wrap', 2.6],
      ['แซลมอนชิโอะยูกเกะ', 'Salmon Shio Yukke', 2.6],
      ['เท็กกะมากิ', 'Tuna Roll', 2.6],
      ['เนกิมามากิ', 'Minced Tuna Roll', 2.6],
      ['กุงกังมะกุโระสับ', 'Minced Tuna Gunkan', 2.6],
      ['ทูน่าสลัดมาโย', 'Tuna Mayo Salad', 2.6],
      ['แซลมอนชิ้นใหญ่สด', 'Big Cut Fresh Salmon', 3.2],
      ['บินโตโระ', 'Albacore Tuna', 3.2],
      ['มะกุโระ ชิโอะโคจิ', 'Shio Koji Tuna', 3.2],
      ['จูโทโระ', 'Medium Fatty Tuna', 4.2],
      ['แซลมอนโทโระชิ้นใหญ่ + อิคุระ', 'Big Cut Salmon Belly with Ikura', 4.2],
      ['โอโทโระ', 'Bluefin Fatty Tuna', 5.2],
      ['โอโทโระ อาบุริโชยุ', 'Aburi Soy Sauce Bluefin Fatty Tuna', 5.2],
      ['แซลมอนอะโวคาโดโรล', 'Salmon Avocado Roll', 5.2],
    ]),
  },
  {
    id: 'silver-white-fish',
    label: 'ปลาฮามาจิ ปลาบุริ กลุ่มปลาผิวเงิน',
    shortLabel: 'ปลาผิวเงิน',
    english: 'Silver-skin & White Fish',
    image:
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=85',
    items: makeItems('silver-white-fish', [
      ['ยากิซาบะ', 'Grilled Mackerel', 2.6],
      ['ชิเมะซาบะ', 'Vinegared Mackerel', 2.6],
      ['เมคาจิกิ', 'Swordfish', 2.6],
      ['เองาวะ', 'Engawa (Fin)', 2.6],
      ['เองาวะ อาบุริโชยุ', 'Aburi Soy Sauce Engawa', 2.6],
      ['ห่อซาบะเมนไตอาบุริ', 'Broiled Mentai Mackerel Wrap', 2.6],
      ['ซาบะโทโระกดพิมพ์', 'Fatty Mackerel Oshisushi', 3.2],
      ['ซาบะเมนไตอาบุริกดพิมพ์', 'Broiled Mentai Mackerel Oshisushi', 4.2],
      ['ฮามาจิสด', 'Fresh Young Yellowtail', 4.2],
      ['ปลากะพงแดงสด', 'Fresh Red Snapper', 5.2],
    ]),
  },
  {
    id: 'shrimp-crab-shellfish',
    label: 'กุ้ง ปู หอย',
    shortLabel: 'กุ้ง ปู หอย',
    english: 'Shrimp / Crab / Shellfish',
    image:
      'https://images.unsplash.com/photo-1563612116625-3012372fccce?auto=format&fit=crop&w=400&q=85',
    items: makeItems('shrimp-crab-shellfish', [
      ['เอบิ', 'Shrimp', 2.6],
      ['จัมโบ้ อากะเอบิ', 'Big Red Shrimp', 2.6],
      ['อามะเอบิ', 'Sweet Shrimp', 2.6],
      ['อะคางาอิ', 'Ark Shell', 2.6],
      ['ฮกกิไก', 'Surf Clam', 2.6],
      ['ฮกกิไก บาซิลเลมอน', 'Surf Clam with Basil Lemon', 2.6],
      ['คานิคามะเทมปุระ', 'Crab Stick Tempura', 2.6],
      ['กุงกังอามะเอบิ', 'Sweet Shrimp Gunkan', 2.6],
      ['สลัดคานิคามะ', 'Crab Stick Salad', 2.6],
      ['สลัดหอยฮกกิไกมาโย', 'Surf Clam Mayo Salad', 2.6],
      ['อากะเอบิ ชิโอะโคจิ', 'Shio Koji Big Red Shrimp', 3.2],
      ['เอบิอะโวคาโด', 'Shrimp with Avocado', 3.2],
      ['หอยเชลล์นึ่ง', 'Steamed Scallop', 3.2],
      ['หอยเชลล์นึ่ง บาซิลเลมอน', 'Steamed Scallop with Basil Lemon', 3.2],
      ['เอบิชีสมาโย อาบุริ', 'Aburi Shrimp Cheese', 3.2],
      ['เอบิเมนไตชีสมาโย อาบุริ', 'Aburi Shrimp Mentai Cheese', 3.2],
      ['เอบิบาซิลชีสมาโย อาบุริ', 'Aburi Shrimp Basil Cheese', 3.2],
      ['เอบิเทมปุระ', 'Shrimp Tempura', 3.2],
      ['คานิมิโซะ', 'Crab Butter', 3.2],
      ['คานิมาโยเนื้อปู', 'Crab Meat Mayo', 4.2],
      ['คานิมิโซะ + เนื้อปู', 'Crab Butter and Crab Meat', 4.2],
      ['หอยเชลล์จัมโบ้', 'Jumbo Scallop', 5.2],
      ['หอยเชลล์จัมโบ้ อาบุริโชยุ', 'Aburi Soy Sauce Jumbo Scallop', 5.2],
    ]),
  },
  {
    id: 'squid-octopus-eel',
    label: 'ปลาหมึก ทาโกะ อุนางิ อานาโกะ',
    shortLabel: 'หมึก ทาโกะ ปลาไหล',
    english: 'Squid / Octopus / Eel',
    image:
      'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=400&q=85',
    items: makeItems('squid-octopus-eel', [
      ['ยาริอิกะ (ทั้งตัว)', 'Whole Spear Squid', 2.6],
      ['อิกะ', 'Squid', 2.6],
      ['อิกะ เกลือ-งา', 'Salt and Sesame Oil Squid', 2.6],
      ['ทาโกะสด เกลือ-งา', 'Salt and Sesame Oil Fresh Octopus', 2.6],
      ['ทาโกะวาซาบิ', 'Tako Wasabi', 2.6],
      ['อุนางิย่าง', 'Grilled Eel', 3.2],
      ['อานาโกะพรีเมียม อาบุริ', 'Premium Aburi Conger Eel', 4.2],
      ['อุนางิย่างชิ้นใหญ่', 'Big Cut Grilled Eel', 4.2],
      ['อุนางิอะโวคาโดโรล', 'Eel Avocado Roll', 5.2],
    ]),
  },
  {
    id: 'tempura-aburi',
    label: 'เทมปุระ เบิร์นไฟ',
    shortLabel: 'เทมปุระ เบิร์นไฟ',
    english: 'Tempura / Aburi',
    image:
      'https://images.unsplash.com/photo-1581781870027-04212e231e96?auto=format&fit=crop&w=400&q=85',
    items: makeItems('tempura-aburi', [
      ['เอบิทอดอะโวคาโดโรล', 'Fried Shrimp & Avocado Roll', 2.6],
      ['เอบิเทมปุระ', 'Shrimp Tempura', 3.2],
    ]),
  },
  {
    id: 'meat-egg-other',
    label: 'เนื้อ ไข่ อื่น ๆ',
    shortLabel: 'เนื้อ ไข่ อื่น ๆ',
    english: 'Meat / Egg / Other',
    image:
      'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=400&q=85',
    items: makeItems('meat-egg-other', [
      ['ทามาโกะ', 'Japanese Omelette', 2.6],
      ['หมาผัวเถ้าแก่', 'Mapo Eggplant', 2.6],
      ['หมูสามชั้น', 'Pork Belly', 2.6],
      ['อินาริ', 'Inari', 2.6],
      ['อินาริพลังงานสูง (มีไข่ + เนื้อวัว)', 'Energy Boost Inari', 2.6],
      ['โทบิโกะ', 'Flying Fish Roe', 2.6],
      ['ข้าวโพดมาโย', 'Corn Mayo', 2.6],
      ['นัตโตะ', 'Natto', 2.6],
      ['ทาระมาโย', 'Cod Roe with Mayo', 2.6],
      ['ไคเซ็นรสจัดจ้าน', 'Spicy Kaisen', 2.6],
      ['แคปปะมากิ', 'Cucumber Roll', 2.6],
      ['กัลบี้เนื้อวัว', 'Beef Galbi', 3.2],
      ['สึคุเนะ (ลูกชิ้นไก่)', 'Chicken Meat Ball', 3.2],
      ['โรสต์บีฟพรีเมียม', 'Premium Roast Beef', 4.2],
      ['ห่ออิคุระ', 'Salmon Roe Wrap', 4.2],
      ['หมูคุโรบุตะตุ๋น', 'Braised Kurobuta Pork Nigiri', 5.2],
      ['อิคุระกุงกัง', 'Salmon Roe Gunkan', 5.2],
    ]),
  },
]
