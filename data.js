/* ===== แก้ข้อมูลของคุณที่ไฟล์นี้ไฟล์เดียว =====
   ช่องที่ว่าง ("") จะแสดงว่า "ยังไม่ได้เพิ่มข้อมูล"
   รูปโปรไฟล์: วางไฟล์ไว้ในโฟลเดอร์ images/ แล้วใส่ชื่อไฟล์ เช่น "images/profile.jpg" */
const SITE = {
  title: "Wachirawit’s Personal Website",
  welcome: "SAWATDEE KUB! 😋",
  fullName: "วชิรวิทย์ วังสะวิบูลย์",
  nickname: "ปลา",
  photo: "images/PLA.jpg",                 // เช่น "images/profile.jpg"
  intro: "สวัสดีครับ ผมเป็นคนที่ชอบเล่นเกม เทคโนโลยี คอมพิวเตอร์ และการออกแบบ ชอบเรียนรู้สิ่งใหม่ ๆ และพัฒนาทักษะของตัวเองอยู่เสมอ",                 // แนะนำตัวสั้น ๆ
  typingWords: [],           // เช่น ["นักเรียน", "คนชอบเกม"] (ว่างไว้ = ไม่แสดง)

  color: "น้ำเงิน",              
  food: "ผัดกะเพรา , ผัดไทย",
  interests: "การเล่นเกม , การออกแบบ , ซ่อมคอมพิวเตอร์ ",
  motto: "ทำดูก่อนแล้วค่อยว่ากัน",
  talent: "การเล่นเกม",
  tech: "เล่นเกม , การออกแบบ , ซ่อมคอมพิวเตอร์",
  goal: "ยังไม่ไม่มีเป้าหมายที่ชัดเจน แต่กำลังหาสิ่งที่ชอบและอยากทำอยู่",
  fun: "😋",

  // งานอดิเรก: { name: "ชื่อกิจกรรม", imgs: ["images/a.jpg", "images/b.jpg"], desc: "ทำไมถึงชอบ", icon: "🎮" }
  //   imgs = ใส่ได้กี่รูปก็ได้ (กดที่รูปเพื่อเปิดดู เลื่อนซ้าย-ขวาได้) หรือใช้ img: "images/a.jpg" แบบรูปเดียวก็ได้
  //   ถ้าไม่มีรูป จะแสดง icon (อีโมจิ) แทน | ถ้ามีเกิน 5 รายการ จะโชว์ 5 อันแรกและมีปุ่ม "ดูเพิ่มเติม"
  hobbies: [{ name: "ถ่ายรูป / เที่ยว", imgs: ["images/2.jpg", "images/1.jpg", "images/3.jpg"], desc: "รู้สึกทำให้อยู่กับตัวเอง", icon: "🎮" },
            { name: "เล่นเกม", desc: "สนุก", icon: "🎮" },
            { name: "บาริสต้า",imgs: ["images/c1.jpg", "images/c2.jpg", "images/c3.jpg", "images/c4.jpg", "images/c5.jpg", "images/c6.jpg"], desc: "ชอบทำกาแฟ", icon: "🎨" },
            { name: "ออกแบบ", imgs: ["images/d1.png", "images/d2.png", "images/d3.png", "images/d4.png"], desc: "สนุก", icon: "🎨" }
        ],

  // ทักษะ: { name: "ชื่อทักษะ", level: 80, logo: "figma" }  (level = 0–100 เปอร์เซ็นต์)
  // logo รองรับ: figma, photoshop, illustrator, premierepro, aftereffects, lightroom, canva, html, css, javascript, python
  // หรือใส่ path รูปเอง เช่น "images/vscode.png" (หรือใส่ icon: "🎮" เป็นอีโมจิแทนได้)
  skills: [{ name: "HTML", level: 50, logo: "HTML" },
           { name: "CSS", level: 45, logo: "CSS" },
           { name: "JavaScript", level: 40, logo: "javascript" },
           { name: "Python", level: 35, logo: "python" },
           { name: "Premiere Pro", level: 55, logo: "premierepro" },
           { name: "Canva", level: 65, logo: "canva" },
           { name: "photoshop", level: 45, logo: "photoshop" },
           { name: "Figma", level: 45, logo: "figma" }
          ],

  // ผลงาน: { title: "ชื่อผลงาน", imgs: ["images/work1.jpg", "images/work2.jpg"], desc: "รายละเอียด", url: "https://...", icon: "💻" }
  //   ใช้ imgs หลายรูปได้เหมือนงานอดิเรก (หรือ img รูปเดียว)
  projects: [{ title: "Healthcarebymyself", imgs: ["images/healthcarebymyself.png", "images/healthcarebymyself2.jpg", "images/healthcarebymyself3.jpg"], desc: "ผลงานชิ้นนี้เป็นเว็บไซต์เกี่ยวกับการดูแลสุขภาพโดยใช้เทคโนโลยี", url: "https://www.healthcarebymyself.com/", icon: "💻" }
             
            ],

  email: ["6930611036@psu.ac.th", "wwangsawibuby@gmail.com"],
  // ลิงก์โซเชียล: { label: "Instagram", url: "https://..." }
  socials: [{ label: "Instagram", url: "https://www.instagram.com/p6laxx/" },
            { label: "Facebook", url: "https://www.facebook.com/wachirawit.wangswiboon" },
            { label: "Discord", url: "https://discord.com/users/948613684228395058"},
            { label: "GitHub", url: "https://github.com/P6LA"},
            { label: "YouTube", url: "https://www.youtube.com/@P6LAAA" },
            { label: "TikTok", url: "https://www.tiktok.com/@p6laxx" }
           ]
};
