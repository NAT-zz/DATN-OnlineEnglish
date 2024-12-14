import '../../utils/highlight';
import ReactQuill from 'react-quill';
import { useCallback, useRef } from 'react';
//
import { EditorProps } from './types';
import { StyledEditor } from './styles';
import EditorToolbar, { formats } from './EditorToolbar';

// ----------------------------------------------------------------------

export default function Editor({
  id = 'minimal-quill',
  error,
  value,
  onChange,
  simple = false,
  helperText,
  sx,
  imageHandler,
  ...other
}: EditorProps) {
  const uploadImageHandler = useCallback(async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/jpeg,image/jpg');
    input.click();
    input.onchange = async () => {
      const file: any = input && input.files ? input.files[0] : null;
      const quillObj = reactQuillRef.current?.getEditor();
      if (imageHandler) {
        const link = await imageHandler(file);
        console.log('link',link);
        
        if (link) {
          const range = quillObj?.getSelection();
          quillObj?.insertEmbed(range?.index || 0, 'image', link);
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const modules = {
    toolbar: {
      container: `#${id}`,
      handlers: {
        image: uploadImageHandler,
      },
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
    syntax: true,
    clipboard: {
      matchVisual: false,
    },
  };

  const reactQuillRef = useRef<ReactQuill>(null);

  return (
    <>
      <StyledEditor
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`,
          }),
          ...sx,
        }}
      >
        <EditorToolbar id={id} isSimple={simple} />

        <ReactQuill
          ref={reactQuillRef}
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder="Write something awesome..."
          {...other}
        />
      </StyledEditor>

      {helperText && helperText}
    </>
  );
}
