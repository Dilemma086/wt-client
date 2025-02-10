import React, { useState, useEffect , useRef, useCallback } from 'react';
import { Link } from 'react-router-dom'
import style from './../../Client/mainstyle.module.css'
import performances from './../../Client/public/performances.jpg'
import museums from './../../Client/public/museums.jpg'
import ekskursii from './../../Client/public/ekskursii.jpg'
import exhibitions from './../../Client/public/exhibitions.jpg'
import show from './../../Client/public/show.jpg'
import sports from './../../Client/public/sports.jpg'

const MenuButtonSlider = () => {
    const [isVisible, setIsVisible] = useState(false);
     // Используем ref для доступа к элементу

    const handleScroll = useCallback(() => {
        const menuButton = sliderRef.current; // Получаем текущий элемент из ref
        if (menuButton) { // Проверяем, что элемент существует
            const rect = menuButton.getBoundingClientRect();
            
            if (rect.top < window.innerHeight) {
                setIsVisible(true); // Устанавливаем состояние видимости
                window.removeEventListener('scroll', handleScroll); // Удаляем слушатель после появления
            }
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);


    // Slider
    const sliderRef = useRef(null);
    let isDown = false;
    let startX;
    let scrollLeft;

    const handleTouchStart = (e) => {
        isDown = true;
        startX = e.touches[0].pageX - sliderRef.current.offsetLeft;
        scrollLeft = sliderRef.current.scrollLeft;
    };

    const handleTouchEnd = () => {
        isDown = false;
    };

    const handleTouchMove = (e) => {
        if (!isDown) return; // остановить выполнение, если не нажато
        e.preventDefault();
        const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2; // скорость прокрутки
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div className={`${style.menuButton} ${isVisible ? style.visible : ''}`} 
            ref={sliderRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}>
        
            <button>
                <Link to='/category/performances'>
                <img src={performances} alt='performances'></img>
                <span>Спектакли</span>
                </Link>
            </button>
            <button>
                <img src={museums} alt='museums'></img>
                <span>Музеи</span>
            </button>
            <button>
                <img src={ekskursii} alt='ekskursii'></img>
                <span>Экскурсии</span>
            </button>
            <button>
                <img src={exhibitions} alt='exhibitions'></img>
                <span>Выставки</span>
            </button>
            <button>
                <img src={show} alt='show'></img>
                <span>Шоу</span>
            </button>
            <button>
                <img src={sports} alt='sports'></img>
                <span>Спорт</span>
            </button>
            
        </div>
    )    
        
}

export default MenuButtonSlider