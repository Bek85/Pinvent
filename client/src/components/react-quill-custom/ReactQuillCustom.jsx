import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function ReactQuillCustom({ field, onChange, placeholder }) {
  return (
    <ReactQuill
      {...field}
      placeholder={placeholder}
      onChange={onChange}
      modules={ReactQuillCustom.modules}
      formats={ReactQuillCustom.formats}
    />
  );
}

ReactQuillCustom.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['clean'],
  ],
};
ReactQuillCustom.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'color',
  'background',
  'list',
  'bullet',
  'indent',
  'link',
  'video',
  'image',
  'code-block',
  'align',
];
