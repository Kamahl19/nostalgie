import { Markdown, MarkdownComponent } from 'nostalgie';
import * as React from 'react';

export function ProseMarkdown(props: { for: MarkdownComponent }) {
  return (
    <props.for
      className="p-3 prose prose-sm sm:prose max-w-none"
      options={{
        overrides: {
          img: {
            props: {
              className: 'h-5 inline-block my-0',
            },
            component: (props) => <img {...props} style={{ marginTop: 0, marginBottom: 0 }} />,
          },
        },
      }}
    />
  );
}

export function ProseMarkdownText(props: { children: string }) {
  return (
    <div className="p-3 prose prose-sm sm:prose max-w-none">
      <Markdown
        options={{
          overrides: {
            img: {
              props: {
                className: 'h-5 inline-block my-0',
              },
              component: (props) => <img {...props} style={{ marginTop: 0, marginBottom: 0 }} />,
            },
          },
        }}
        children={props.children}
      />
    </div>
  );
}