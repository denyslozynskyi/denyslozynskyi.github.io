const slider = tns({
    container: '.carousel__inner',
    items: 1,
    speed: 1200,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false,
    touch: true,
    autoplayButton: false,
    autoplayButtonOutput: false,
    responsive: {
        769: {
            autoplay: false,
        },
        300: {
            autoplay: true,
        }
    }
});

document.querySelector('.prev').addEventListener('click', () => {
    slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', () => {
    slider.goTo('next');
});

$(document).ready(function(){
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modal

    $('[data-modal = consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn();
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        });
    });

    $('.modal__close').on('click', function() {
        $('.overlay, .modal').fadeOut();
    });

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: 'required',
                phone: 'required',
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: 'Пожалуйста, ввведите Ваше имя',
                phone: 'Пожалуйста, ввведите Ваш мобильный телефон',
                email: {
                    required: 'Пожалуйста, введите Вашу электронную почту',
                    email: 'Электронная почта должна иметь формат email@domain.com '
                }
            }
        });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name = phone]').mask('+7 (999) 999-99-99');

    $('form').submit(function(e) {
        e.preventDefault();
        
        if (!$(this).valid()) {
            return;
        };
        
        $.ajax({
            type: 'POST',
            url: 'mailer/smart.php',
            data: $(this).serialize()
        }).done(function() {
            $(this).find('input').val('');


            $('form').trigger('reset');
        });
        return false;
    });
});