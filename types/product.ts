/**
 * מבנה נתונים אחיד למוצר.
 * המבנה הזה נשמר זהה בין MOCK MODE ל-WIX LIVE MODE,
 * כדי שרכיבי ה-UI לא יצטרכו להשתנות כשנתחבר ל-Wix.
 */

export interface ProductVariant {
  id: string;
  label: string;       // לדוגמה: "5 מ"ל" או "10 מ"ל"
  priceOverride?: number; // אם המחיר שונה לוריאציה הזו
  inStock: boolean;
}

export interface Product {
  id: string;               // slug ייחודי, לדוגמה "kerem-lachut-liom"
  name: string;              // שם בעברית
  nameEn?: string;           // שם באנגלית, אם קיים
  sku?: string;              // TODO: לא קיים במקור באקסל - יושלם בשלב ייבוא ל-Wix
  category: string;
  subcategory?: string;      // TODO: לא קיים במקור - כרגע יש רק קטגוריה ראשית אחת
  price: number;
  salePrice?: number;        // TODO: לא קיים כמספר במקור - יש רק טקסט שיווקי כללי
  volume?: string;           // לדוגמה "50 מ"ל"
  variants?: ProductVariant[]; // רלוונטי למוצרים עם בחירת נפח (לדוגמה שמנים אתריים: 5/10 מ"ל)
  shortDescription: string;
  fullDescription: string;
  ingredients?: string[];
  benefits?: string[];
  usageInstructions?: string;
  warnings?: string;         // TODO: ברוב המוצרים לא צוינו אזהרות מפורשות
  skinType?: string;         // כפי שמופיע במקור, לרוב "מתאים לכל סוגי העור"
  inStock: boolean;          // TODO: אין מידע מלאי במקור - ברירת מחדל true עד לחיבור Wix
  mainImage: string;         // קישור ישיר לתמונה המקורית (CDN של ספק המקור - להחלפה בעת חיבור Wix בפועל)
  imageFilename?: string;    // שם קובץ התמונה המקורי, לצורך התאמה עתידית ל-Wix Media
  additionalImages?: string[]; // TODO: הקובץ המקורי מכיל תמונה ראשית אחת בלבד למוצר
  sourceUrl?: string;         // קישור למוצר באתר המקור, לצורך בדיקה בלבד
  missingInfo: string[];      // רשימת שדות חסרים לצורך שקיפות לצוות
}
