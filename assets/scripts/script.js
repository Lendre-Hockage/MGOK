let content1 = document.getElementById("step1"),
content2 = document.getElementById("step2"),
content3 = document.getElementById("step3"),
content4 = document.getElementById("step4"),
content5 = document.getElementById("step5"),
content6 = document.getElementById("step6");

let head = document.getElementById("header");
let foot = document.getElementById("footer");

let btn1 = document.getElementById("next1"), 
btn2 = document.getElementById("next2"),
btn3 = document.getElementById("next3"),
btn4 = document.getElementById("next4"),
btn5 = document.getElementById("next5");

let back2 = document.getElementById("back2"),
back3 = document.getElementById("back3"),
back4 = document.getElementById("back4"),
back5 = document.getElementById("back5");




var currentStep = parseInt($("form").attr('data-current-step'));

back2.addEventListener("click", () => {
  currentStep--;
  content2.style.display = "none";
  content1.style.display = "block";
})
back3.addEventListener("click", () => {
  currentStep--;
  content3.style.display = "none";
  content2.style.display = "block";
})
back4.addEventListener("click", () => {
  currentStep--;
  content4.style.display = "none";
  content3.style.display = "block";
})
back5.addEventListener("click", () => {
  currentStep--;
  content5.style.display = "none";
  content4.style.display = "block";
})

btn1.addEventListener("click", () => {
  // var allRight = true;

  //   if ($(".sectionSelector:checked").length < 1) {
  //     alert("Выберите кружок для записи!");
      
  //   } else if (!$("#personalDataAgree").prop("checked")) {
  //     alert("Необходимо дать согласие на обработку персональных данных");
      
  //   } else if (!$("#signatureSimpleAgree").prop("checked")) {
  //     alert(
  //       "Необходимо дать согласие на подписание договора простой электронной подписью"
  //     )} 
  //     else {
    content1.style.display = "none";
    content2.style.display = "block";
    // }
}
);

btn2.addEventListener("click", () => {
  content2.style.display = "none";
  content3.style.display = "block";
});
btn3.addEventListener("click", () => {
  content3.style.display = "none";
  content4.style.display = "block";
});
btn4.addEventListener("click", () => {
  content4.style.display = "none";
  content5.style.display = "block";
});
btn5.addEventListener("click", () => {
  content5.style.display = "none";
  content6.style.display = "block";
});







let descText = document.getElementById("tdDescription");

let description = document.getElementById("fullDescription");

var $currentSection = null;
var studentAgeWhenStart = null;
var contractForMe = false;

$(document).ready(function () {
  $(".tdDescription").mousemove(function (e) {
    $(this)
      .find(".fullDescription")
      .css({ left: e.pageX + "px", top: e.pageY + "px" });
    $(this).find(".fullDescription").show();
  });
  $(".tdDescription").mouseout(function () {
    $(this).find(".fullDescription").hide();
  });
});
