var $currentSection = null;
var studentAgeWhenStart = null;
var contractForMe = false;

$(document).ready(function () {
    $('.datepicker').pickmeup_twitter_bootstrap();
    $('#address').keyup(function () {
        if ($("#equalAddress").prop('checked')) {
            $("#studentAddress").val($("#address").val());
        }
    });
    $('#equalAddress').on('change', function () {
        $studentAddress = $("#studentAddress");
        if (!$(this).prop('checked')) {
            $studentAddress.removeAttr('disabled');
        } else {
            $studentAddress.attr('disabled', 'disabled');
            $studentAddress.val($("#address").val());
        }
    });
    $("#contractForMe").on('change', function() {
        if (!$(this).prop('checked')) {
            $(".hideForMe").show();
        } else {
            $(".hideForMe").hide();
        }
    });
    $(".sectionTr").on('click', function(e) {
        var $input = $(this).find("input[type='radio']");
        if (!$input.is(e.target)) {
            $input.click();
        }
    });
    $(".tdDescription").mouseover(function(e) {
        $(this).find(".fullDescription").css({left: e.pageX + 'px', top: e.pageY + 'px'});
        $(this).find(".fullDescription").show();
    });
    $(".tdDescription").mouseout(function() {
        $(this).find(".fullDescription").hide();
    });
    $("#search").keyup(function() {
       var searchText = new RegExp($(this).val(), 'i');
        $(".sectionTr").each(function() {
            var html = $(this).attr('data-search');
            if (!searchText.test(html)) {
                $(this).hide();
            } else {
                $(this).show();
            }
        })
    });
    $("#phone, #studentPhone").inputmask("+7 (999) 999-99-99");
    $(".datepicker").inputmask("99.99.9999");
    $("#email").inputmask({
        mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
        greedy: false,
        onBeforePaste: function (pastedValue, opts) {
            pastedValue = pastedValue.toLowerCase();
            return pastedValue.replace("mailto:", "");
        },
        definitions: {
            '*': {
                validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
                casing: "lower"
            }
        }
    });
    $("#snils").inputmask("999-999-999 99");

    $("#benefit").on('change', function() {
        if (parseInt($("#benefit").val()) > 0) {
            $("#benefitReasonFile").show();
        } else {
            $("#benefitReasonFile").hide();
        }
    });

    $("#back").click(function() {
        var currentStep = parseInt($("form").attr('data-current-step'));
        if (currentStep > 1) {
            if (currentStep == 4 && $currentSection.attr('data-benefit') == '0') {
                showStep(2);
            } else {
                showStep(currentStep - 1);
            }
        }
    });

    $("#next").click(function() {
        var currentStep = parseInt($("form").attr('data-current-step'));
        var allRight = true;
        // check
        if (currentStep == 1) {
            if (!$("#startContract").inputmask("isComplete") || !moment($("#startContract").val(), "DD.MM.YYYY").isValid()) {
                alert('Дата начала должна быть корректной датой в формате ДД.ММ.ГГГГ');
                allRight = false;
            } else if ($(".sectionSelector:checked").length < 1) {
                alert('Выберите кружок для записи!');
                allRight = false;
            } else if (!$("#personalDataAgree").prop("checked")) {
                alert('Необходимо дать согласие на обработку персональных данных');
                allRight = false;
            } else if (!$("#signatureSimpleAgree").prop("checked")) {
                alert('Необходимо дать согласие на подписание договора простой электронной подписью');
                allRight = false;
            } else {
                $currentSection = $(".sectionSelector:checked");
                var startSection = moment($currentSection.attr('data-date-from'), "DD.MM.YYYY");
                var finishSection = moment($currentSection.attr('data-date-to'), "DD.MM.YYYY");
                var startContract = moment($("#startContract").val(), "DD.MM.YYYY");
                if (startContract < startSection || startContract > finishSection) {
                    alert('Дата начала посещения кружка должна быть между ' + startSection.format("DD.MM.YYYY") + ' и ' + finishSection.format("DD.MM.YYYY"));
                    allRight = false;
                }
            }
        } else if (currentStep == 2) {
            contractForMe = !!$("#contractForMe").prop("checked");
            $(".step[data-step=2] *[required]").each(function() {
                if (!$(this).val() || $(this).attr('im-insert') && !$(this).inputmask("isComplete") ||
                    $(this).hasClass('datepicker') && !moment($(this).val(), "DD.MM.YYYY").isValid()) {
                    if (!contractForMe || contractForMe && !$(this).parents(".hideForMe").length) {
                        $(this).css("border", "1px solid #f00");
                        allRight = false;
                    }
                } else {
                    $(this).css("border", "1px solid #ced4da");
                }
            });
            if (!allRight) {
                alert("Одно или несколько полей не заполнено или заполнено неверно. Проверьте данные");
            } else {
                var startContract = moment($("#startContract").val(), "DD.MM.YYYY");
                var birthday = moment($("#studentBirthDay").val(), "DD.MM.YYYY");
                var ageFrom = parseInt($currentSection.attr('data-age-from'));
                var ageTo = parseInt($currentSection.attr('data-age-to'));
                studentAgeWhenStart = moment.duration(startContract.diff(birthday)).years();
                if (studentAgeWhenStart < ageFrom || studentAgeWhenStart > ageTo) {
                    alert("Возраст обучающегося данного кружка должен быть от " + ageFrom + " до " + ageTo + " лет");
                    allRight = false;
                } else if (studentAgeWhenStart >= 14 && ($("#phone").val() == $("#studentPhone").val()) && !contractForMe) {
                    alert("Номера телефонов Заказчика и Обучающегося не должны совпадать для Обучающихся 14 лет и старше");
                    allRight = false;
                } else if (studentAgeWhenStart >= 14 && !$("#studentPhone").val() && !contractForMe) {
                    alert("Необходимо заполнить номер телефона для Обучающихся 14 лет и старше");
                    allRight = false;
                }
                var studentDateDoc = moment($(contractForMe ? "#docDate" : "#studentDocDate").val(), "DD.MM.YYYY");
                if (studentDateDoc < birthday) {
                    alert("Дата выдачи документа должна быть после даты рождения");
                    allRight = false;
                }
            }
        } else if (currentStep == 3) {
            if (parseInt($("#benefit").val()) > 0) {
                if (!$("#benefitReason").val()) {
                    allRight = false;
                    alert("Загрузите файл, подтверждающий льготу!");
                }
            }
        }
        if (allRight) {
            var formData = new FormData();
            $.each($("form").find("input[type='file']"), function(i, tag) {
                $.each($(tag)[0].files, function(i, file) {
                    formData.append(tag.name, file);
                });
            });
            var params = $("form").serializeArray();
            $.each(params, function (i, val) {
                formData.append(val.name, val.value);
            });
            if (currentStep == 5) {
                formData.append('final', 1);
                $.ajax({
                    method: 'POST',
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function(data) {
                        data = JSON.parse(data);
                        if (data.error) {
                            alert("Ошибка при обработке запроса: " + data.error);
                        } else {
                            showStep(6);
                            $("#yourEmail").html($("#email").val());
                            $("#back").hide();
                            $("#next").hide();
                        }
                    }
                });
            } else if (currentStep == 3 || currentStep == 2 && $currentSection.attr('data-benefit') == '0') {
                $.ajax({
                    method: 'POST',
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function(data) {
                        data = JSON.parse(data);
                        if (data.error) {
                            alert("Ошибка при обработке запроса: " + data.error);
                        } else {
                            if (studentAgeWhenStart >= 14 && !contractForMe) {
                                $("#smsCode2Block").show();
                            } else {
                                $("#smsCode2Block").hide();
                            }
                            $("#spanPhone").html($("#phone").val());
                            if (!contractForMe) {
                                $("#spanStudentPhone").html($("#studentPhone").val());
                            }
                            showStep(4);
                            $("#contractId").val(data.id);
                            $("#downloadLink").attr('href', '/generate?id=' + data.id + '&passport=' + $("#docSeria").val() + $("#docNumber").val());
                            $("#downloadFinalLink").attr('href', '/download?id=' + data.id + '&passport=' + $("#docSeria").val() + $("#docNumber").val());
                        }
                    }
                })
            } else if (currentStep == 4) {
                formData.append('sendCodes', 1);
                $.ajax({
                    method: 'POST',
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function(data) {
                        showStep(5);
                    }
                })
            } else {
                currentStep++;
                showStep(currentStep);
            }
        }
    });


});

function showStep(currentStep) {
    $("form").attr('data-current-step', currentStep);
    $(".step").hide();
    $(".step[data-step=" + currentStep + "]").show();
    if (currentStep > 1) {
        $("#back").show();
    }
}