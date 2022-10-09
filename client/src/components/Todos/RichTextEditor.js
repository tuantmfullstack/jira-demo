import { Box, Button } from '@chakra-ui/react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import parse from 'html-react-parser';
import { useState } from 'react';

const RichTextEditor = ({ data, getTextEditor, show = false }) => {
  const [text, setText] = useState(data);
  const [showEditor, setShowEditor] = useState(show);

  const dataChangeHandler = (e, editor) => {
    const data = editor.getData();
    setText(data);
  };

  const editorClickHandler = () => {
    setShowEditor(true);
  };

  const saveDataHandler = () => {
    getTextEditor(text);
    setShowEditor(false);
  };

  return (
    <Box gap={'24px'} width='100%'>
      {showEditor ? (
        <>
          <CKEditor
            editor={ClassicEditor}
            data={text}
            onChange={dataChangeHandler}
          />
          <Button onClick={saveDataHandler} colorScheme='blue' marginTop='16px'>
            Save
          </Button>
        </>
      ) : (
        <Box onClick={editorClickHandler}>{parse(text)}</Box>
      )}
    </Box>
  );
};

export default RichTextEditor;
