// src/app/(pages)/admin/courses/manage/CourseContentEditor.tsx
'use client';

import '@ant-design/v5-patch-for-react-19';
import React from 'react';
import { Button } from 'antd';
import { BoldOutlined, ItalicOutlined, StrikethroughOutlined, CodeOutlined, OrderedListOutlined, UnorderedListOutlined, BlockOutlined, LinkOutlined, ClearOutlined } from '@ant-design/icons';

// TipTap Imports
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';

// Interface for content item (imported from CourseContentManager)
import { CourseContentItem } from './CourseContentManager';

// TipTap Toolbar Component (moved here)
interface TipTapToolbarProps {
  editor: Editor | null;
}

const TipTapToolbar: React.FC<TipTapToolbarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
        icon={<BoldOutlined />}
        size="small"
        aria-label="Bold"
      />
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
        icon={<ItalicOutlined />}
        size="small"
        aria-label="Italic"
      />
      <Button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
        icon={<StrikethroughOutlined />}
        size="small"
        aria-label="Strike"
      />
      <Button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}
        icon={<CodeOutlined />}
        size="small"
        aria-label="Code"
      />
      <Button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
        icon={<BlockOutlined />}
        size="small"
        aria-label="Paragraph"
      />
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        size="small"
      >
        H1
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        size="small"
      >
        H2
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
        icon={<UnorderedListOutlined />}
        size="small"
        aria-label="Bullet List"
      />
      <Button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        disabled={!editor.can().chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
        icon={<OrderedListOutlined />}
        size="small"
        aria-label="Ordered List"
      />
      <Button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        size="small"
        aria-label="Undo"
      >
        Undo
      </Button>
      <Button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        size="small"
        aria-label="Redo"
      >
        Redo
      </Button>
      <Button
        onClick={() => {
          const url = window.prompt('URL:');
          if (url) {
            editor.chain().focus().setLink({ href: url, target: '_blank' }).run();
          }
        }}
        className={editor.isActive('link') ? 'is-active' : ''}
        icon={<LinkOutlined />}
        size="small"
        aria-label="Set Link"
      />
      <Button
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive('link')}
        icon={<ClearOutlined />}
        size="small"
        aria-label="Unset Link"
      />
    </div>
  );
};

interface CourseContentEditorProps {
  item: CourseContentItem;
  onContentChange: (newDescription: string) => void;
}

const CourseContentEditor: React.FC<CourseContentEditorProps> = ({ item, onContentChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: item.itemDescription,
    onUpdate: ({ editor }) => {
      const htmlContent = editor.getHTML();
      console.log("TipTap Editor HTML Output:", htmlContent); // <--- เพิ่มบรรทัดนี้สำหรับการ Debug
      onContentChange(htmlContent);
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none p-2 border border-gray-300 rounded-b-lg min-h-[100px] bg-white',
      },
    },
    immediatelyRender: false,
  });

  // Effect to update editor content when item.itemDescription changes from outside
  React.useEffect(() => {
    if (editor && editor.getHTML() !== item.itemDescription) {
      editor.commands.setContent(item.itemDescription, { emitUpdate: false });
    }
  }, [item.itemDescription, editor]);


  return (
    <div>
      <TipTapToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default CourseContentEditor;
