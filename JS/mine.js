document.addEventListener("DOMContentLoaded", function () {
  const hearts = document.querySelectorAll(".toggle-heart");
  const boxes = document.querySelectorAll(".boxs");

  // حفظ index لكل بوكس
  boxes.forEach((box, index) => {
    box.setAttribute("data-index", index);
  });

  // استرجاع العناصر المحفوظة
  let savedHearts = JSON.parse(localStorage.getItem("likedHearts")) || [];

  // أول ما الصفحة تفتح، فعّل القلوب اللي متعلم عليها
  hearts.forEach((heart, index) => {
    if (savedHearts.includes(index)) {
      heart.classList.remove("fa-regular");
      heart.classList.add("fa-solid");
      heart.style.color = "red";
    }

    // عند الضغط على القلب
    heart.addEventListener("click", function () {
      let savedHearts = JSON.parse(localStorage.getItem("likedHearts")) || [];

      if (this.classList.contains("fa-regular")) {
        this.classList.remove("fa-regular");
        this.classList.add("fa-solid");
        this.style.color = "red";
        if (!savedHearts.includes(index)) {
          savedHearts.push(index);
        }
      } else {
        this.classList.remove("fa-solid");
        this.classList.add("fa-regular");
        this.style.color = "";
        savedHearts = savedHearts.filter((i) => i !== index);
      }

      // حفظ القلوب المتعلم عليها
      localStorage.setItem("likedHearts", JSON.stringify(savedHearts));

      // حفظ العناصر (البوكسات) اللي فيها قلب
      const likedBoxes = savedHearts.map((i) => boxes[i].outerHTML);
      localStorage.setItem("favoriteBoxes", JSON.stringify(likedBoxes));
    });
  });
});

// تحميل السلة من localStorage أو إنشاء مصفوفة جديدة
let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.querySelectorAll(".inbox").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault(); // يمنع الريفريش

    const product = this.parentElement;
    const productName = product.querySelector(".product-name").textContent;
    const productPrice = product.querySelector(".new-price").textContent;
    const productImage = product.querySelector("img").getAttribute("src");
    const productId = productName + productPrice; // كود المنتج هيتحدد من الاسم والسعر
    const productCode = product.querySelector(".product-code").textContent; // كود المنتج من الـ span المخفي

    const existingItemIndex = cart.findIndex((item) => item.id === productId);

    if (existingItemIndex === -1) {
      // مش موجود في السلة → ضيفه
      const productData = {
        name: productName,
        price: productPrice,
        id: productId,
        image: productImage,
        code: productCode, // إضافة كود المنتج هنا
      };

      cart.push(productData);

      // تحديث localStorage بعد كل تعديل
      localStorage.setItem("cart", JSON.stringify(cart));

      // تحديث الزر
      this.textContent = "تمت الإضافة!";
      this.style.backgroundColor = "#4CAF50";
      this.style.color = "white";

      setTimeout(() => {
        this.textContent = "إزالة من السلة";
        this.style.backgroundColor = "#ff9800";
      }, 1000);
    } else {
      // موجود → احذفه
      cart.splice(existingItemIndex, 1);

      // تحديث localStorage بعد الحذف
      localStorage.setItem("cart", JSON.stringify(cart));

      this.textContent = "أضف إلى السلة";
      this.style.backgroundColor = "";
      this.style.color = "";
    }

    console.log("السلة حالياً:", cart); // تتبع الحالة
  });
});

// عند الضغط على زر الأيقونة
document.getElementById("open-menu").addEventListener("click", () => {
  document.getElementById("sidebar").classList.add("show");
});

// عند الضغط على زر إغلاق الشريط الجانبي
document.getElementById("close-menu").addEventListener("click", () => {
  document.getElementById("sidebar").classList.remove("show");
});

// اختيار جميع الأزرار التي ستقوم بإرسال الرسالة عبر واتساب
const whatsappButtons = document.querySelectorAll(".gallrey .text");

// إضافة حدث الضغط لكل زر
whatsappButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    // الحصول على العنصر الذي يحتوي على كود المنتج
    const product = e.target.closest(".box");
    const productCode = product.getAttribute("data-code");

    // إعداد الرسالة التي سيتم إرسالها عبر واتساب
    const message = `مرحبًا! أريد شراء المنتج التالي:\n\nكود المنتج: ${productCode}`;

    // ترميز الرسالة لتناسب رابط واتساب
    const encodedMessage = encodeURIComponent(message);

    // رابط واتساب
    const whatsappUrl = `https://wa.me/201021219588?text=${encodedMessage}`;

    // فتح الرابط
    window.open(whatsappUrl, "_blank");
  });
});

///////whatsapp
document.getElementById("submitButton").addEventListener("click", function () {
  // جلب البيانات من الإدخالات
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("Subject").value;
  let message = document.getElementById("message").value;

  // رقم الواتساب اللي هتوصله البيانات (بدون + في الأول)
  let phoneNumber = "201021219588";

  // تكوين نص الرسالة اللي هتتبعت
  let whatsappMessage = `الاسم: ${name}%0Aالبريد الإلكتروني: ${email}%0Aرقم الهاتف: ${phone}%0A الموضوع:${address}%0Aالرسالة: ${message}`;

  // فتح واتساب مع البيانات
  let whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
  console.log("WhatsApp URL:", whatsappURL); // تأكد إن الرابط صحيح

  window.open(whatsappURL, "_blank");
});

///

//
