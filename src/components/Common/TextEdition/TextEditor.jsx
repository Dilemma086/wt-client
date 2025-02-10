import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Импорт стилей

const TextEditor = ({ onChange }) => {
    const [editorHtml, setEditorHtml] = useState('');

    const handleChange = (html) => {
        setEditorHtml(html);
        onChange(html); // Передаем HTML в родительский компонент
    };

    return (
        <ReactQuill 
            value={editorHtml}
            onChange={handleChange}
            modules={TextEditor.modules}
            formats={TextEditor.formats}
        />
    );
};

// Определяем модули и форматы для Quill
TextEditor.modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['link', 'image'],
        ['clean'] // Кнопка для удаления форматирования
    ],
};

TextEditor.formats = [
    'header', 'bold', 'italic', 'underline', 'link', 'image'
];

export default TextEditor;
