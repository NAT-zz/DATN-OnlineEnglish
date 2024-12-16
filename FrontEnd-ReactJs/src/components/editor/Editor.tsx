import '../../utils/highlight';
import ReactQuill, { Quill } from 'react-quill';
import { useCallback, useRef } from 'react';
//
import { EditorProps } from './types';
import { StyledEditor } from './styles';
import EditorToolbar, { formats } from './EditorToolbar';

// ----------------------------------------------------------------------

const BlockEmbed = Quill.import('blots/block/embed');

class AudioBlot extends BlockEmbed {
  static create(value: any) {
    const node = super.create();
    node.setAttribute('controls', true);
    node.setAttribute('src', value);
    return node;
  }

  static value(node: { getAttribute: (arg0: string) => any }) {
    return node.getAttribute('src');
  }
}

AudioBlot.blotName = 'audio';
AudioBlot.tagName = 'audio';

Quill.register(AudioBlot);

export default function Editor({
  id = 'minimal-quill',
  error,
  value,
  onChange,
  simple = false,
  helperText,
  sx,
  imageHandler,
  videoHandler,
  fileHandler,
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
        console.log('link', link);

        if (link) {
          const range = quillObj?.getSelection();
          quillObj?.insertEmbed(range?.index || 0, 'image', link);
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const uploadVideoHandler = useCallback(async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'video/mp4,video/webm');
    input.click();
    input.onchange = async () => {
      const file: any = input && input.files ? input.files[0] : null;
      const quillObj = reactQuillRef.current?.getEditor();
      if (videoHandler) {
        const link = await videoHandler(file);
        console.log('link', link);

        if (link) {
          const range = quillObj?.getSelection();
          const iframeHTML = `
          <iframe
            src="${link}"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
            frameBorder="0">
          </iframe>
        `;
          // quillObj?.insertEmbed(range?.index || 0, 'iframe', 'link');
          quillObj?.clipboard.dangerouslyPasteHTML(range?.index || 0, iframeHTML);
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uploadAudioHandler = useCallback(async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'audio/*');
    input.click();
    input.onchange = async () => {
      const file: any = input && input.files ? input.files[0] : null;
      const quillObj = reactQuillRef.current?.getEditor();
      if (imageHandler) {
        const link = await imageHandler(file);
        console.log('link', link);

        if (link) {
          const range = quillObj?.getSelection();
          const iframeHTML = `
          <iframe
            src="${link}"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
            frameBorder="0">
          </iframe>
        `;
          quillObj?.clipboard.dangerouslyPasteHTML(range?.index || 0, iframeHTML);
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const uploadFileHandler = useCallback(async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();
    input.onchange = async () => {
      const file: any = input && input.files ? input.files[0] : null;
      const quillObj = reactQuillRef.current?.getEditor();
      if (fileHandler) {
        const link = await fileHandler(file);
        console.log('link', link);

        if (link) {
          const range = quillObj?.getSelection();
          const iframeHTML = `<a href="${link}" target="_blank">${file.name}</a>`;
          quillObj?.clipboard.dangerouslyPasteHTML(range?.index || 0, iframeHTML);
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
        video: uploadVideoHandler,
        audio: uploadAudioHandler,
        file: uploadFileHandler,
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
