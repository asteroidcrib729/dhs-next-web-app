import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
export default function Markdown({ body }: { body: string }) {
  return (
    <div className="editorial-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        skipHtml
        disallowedElements={["img", "h1"]}
        unwrapDisallowed
        components={{
          a: ({ href, children }) => (
            <a href={href} rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
