"use strict"

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submint', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);
        formData.append('image', formImage.files[0]);

        if (error === 0) {
            form.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = '';
                form.reset();
                form.classList.remove('_sending');
            } else {
                alert('Ошибка');
                form.classList.remove('_sending')
            }
        } else {
            alert('Заполните обязательные поля')
        }
    }

    const formValidate = (form) => {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    const formAddError = (input) => {
        input.parentElement.classlist.add('_error');
        input.classlist.add('_error');
    };

    const formRemoveError = (input) => {
        input.parentElement.classlist.remove('_error');
        input.classlist.remove('_error');
    };

    const emailTest = (input) => {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    };

    const formImage = document.getElementById('formImage');
    const formPreview = document.getElementById('formPreview');

    formImage.addEventListener('change', () => {
        uploadFile(formImage.files[0]);
    });

    const uploadFile = (file) => {
        if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
            alert('Разрешены только изображенияю');
            formImage.value = '';
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert('Файл должен быть менее 2 МБ.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
        };
        reader.onerror = (e) => {
            alert("Ошибка");
        };
        reader.readAsDataURL(file);
    }
});