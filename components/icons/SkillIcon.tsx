// Kumpulan ikon skill (SVG ringan, no lib tambahan)
type Props = { name:
  | "javascript" | "typescript" | "react" | "next" | "tailwind"
  | "golang" | "java" | "python"
  | "html" | "css"
  | "mongodb" | "mysql" | "postgres"
  | "docker" | "nginx" | "git" | "linux";
  className?: string };

export default function SkillIcon({ name, className }: Props) {
  switch (name) {
    case "javascript":
      return (<svg className={className} viewBox="0 0 24 24" aria-label="JavaScript">
        <path fill="#F7DF1E" d="M3 3h18v18H3z"/><path d="M8.4 17.2l1.6-.9c.3.5.6.9 1.3.9.7 0 1.1-.3 1.1-1.4v-7h2v7.1c0 2.1-1.2 3.1-3 3.1-1.6 0-2.6-.8-3-1.8zM14.6 16.9l1.6-.9c.4.6.9 1 1.7 1 .7 0 1.2-.4 1.2-1 0-.7-.5-1-1.4-1.3l-.5-.2c-1.5-.6-2.5-1.4-2.5-3 0-1.5 1.1-2.6 2.8-2.6 1.2 0 2.1.4 2.8 1.5l-1.5 1c-.3-.6-.7-.9-1.3-.9s-1 .4-1 .9c0 .6.4.9 1.3 1.3l.5.2c1.7.7 2.7 1.5 2.7 3.2 0 1.8-1.4 2.8-3.2 2.8-1.8 0-3-0.8-3.7-1.7z" />
      </svg>);
    case "typescript":
      return (<svg className={className} viewBox="0 0 24 24" aria-label="TypeScript">
        <path fill="#3178C6" d="M3 3h18v18H3z"/><path fill="#fff" d="M10.6 11.3H7.9v1.7h1.6v5h2v-5h1.7v-1.7zM14.2 18.4c.5.3 1.2.5 2 .5 1.7 0 2.8-.8 2.8-2.1 0-1-.6-1.6-1.9-2l-.7-.2c-.6-.2-.9-.4-.9-.8 0-.3.3-.6.9-.6.6 0 1.1.2 1.5.5l.8-1.3c-.5-.4-1.3-.7-2.3-.7-1.5 0-2.6.9-2.6 2.1 0 1 .7 1.7 1.9 2.1l.7.2c.6.2.9.4.9.8 0 .3-.3.6-1 .6-.7 0-1.4-.2-2-.6l-.7 1.4z"/>
      </svg>);
    case "react":
      return (<svg className={className} viewBox="0 0 24 24" aria-label="React">
        <circle cx="12" cy="12" r="2.2" fill="#61DAFB"/><g fill="none" stroke="#61DAFB" strokeWidth="1.4">
          <ellipse cx="12" cy="12" rx="10" ry="4.5"/><ellipse cx="12" cy="12" rx="4.5" ry="10"
            transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="4.5" ry="10"
            transform="rotate(120 12 12)"/></g>
      </svg>);
    case "next":
      return (<svg className={className} viewBox="0 0 24 24" aria-label="Next.js">
        <path d="M12 2a10 10 0 1010 10A10.011 10.011 0 0012 2Zm4.6 14.9L10.5 8.5V16h-1V7h1l6.9 9.1z" fill="currentColor"/>
      </svg>);
    case "tailwind":
      return (<svg className={className} viewBox="0 0 24 24" aria-label="Tailwind">
        <path d="M12.001 6.5c-2.667 0-4.334 1.333-5 4 1-1.333 2.167-1.833 3.5-1.5 0.76.19 1.302.74 1.926 1.37C13.26 11.32 14.24 12.3 16.5 12.3c2.667 0 4.334-1.333 5-4-1 1.333-2.167 1.833-3.5 1.5-.76-.19-1.302-.74-1.926-1.37C14.74 7.48 13.76 6.5 11.5 6.5zM7.5 12.7c-2.667 0-4.334 1.333-5 4 1-1.333 2.167-1.833 3.5-1.5.76.19 1.302.74 1.926 1.37 1.833 1.65 2.813 2.63 5.073 2.63 2.667 0 4.334-1.333 5-4-1 1.333-2.167 1.833-3.5 1.5-.76-.19-1.302-.74-1.926-1.37-1.833-1.65-2.813-2.63-5.073-2.63z"
              fill="#38BDF8"/>
      </svg>);
    case "golang":
      return (<svg className={className} viewBox="0 0 24 24" aria-label="Go">
        <path fill="#00ADD8" d="M3 12h7l1-2H4l-1 2zm1-4h9l1-2H5l-1 2zm0 8h5l1-2H4l-1 2z"/><circle cx="16" cy="12" r="5" fill="#00ADD8"/><circle cx="14.5" cy="11" r="1" fill="#fff"/><circle cx="17.5" cy="11" r="1" fill="#fff"/>
      </svg>);
    case "java":
      return (<svg className={className} viewBox="0 0 24 24" aria-label="Java">
        <path d="M8 18c-1.5.7-2.5 1.2-2.5 2 0 1.2 3 2 6.5 2s6.5-.8 6.5-2c0-.8-1-1.3-2.5-2" fill="none" stroke="#f97316" strokeWidth="1.4"/>
        <path d="M12 2s1.5 2-1 4 2 3 2 3" fill="none" stroke="#f97316" strokeWidth="1.4"/>
      </svg>);
    case "python":
      return (<svg className={className} viewBox="0 0 24 24" aria-label="Python">
        <path fill="#3776AB" d="M12 3c4 0 4 2.5 4 2.5V8H8V5.5S8 3 12 3z"/><path fill="#FFDF5A" d="M12 21c-4 0-4-2.5-4-2.5V16h8v2.5S16 21 12 21z"/><circle cx="10" cy="5.5" r="0.7" fill="#fff"/><circle cx="14" cy="18.5" r="0.7" fill="#6b6b6b"/>
      </svg>);
    case "html":
      return (<svg className={className} viewBox="0 0 24 24" aria-label="HTML">
        <path fill="#E34F26" d="M4 3l1.6 18L12 23l6.4-2L20 3H4z"/><path fill="#fff" d="M12 20.2l4.1-1.3.6-6.5H12v-2.1h5.1l.2-2.1H12V6.1h7.2l-.9 10.4L12 20.2z"/>
      </svg>);
    case "css":
      return (<svg className={className} viewBox="0 0 24 24" aria-label="CSS">
        <path fill="#1572B6" d="M4 3l1.6 18L12 23l6.4-2L20 3H4z"/><path fill="#fff" d="M12 20.2l4.1-1.3.4-4.8H12v-2.1h5.1l.2-2.1H7.7l.1 2.1H12v2.1H8.1l.3 3.5 3.6 1.1z"/>
      </svg>);
    case "mongodb":
      return (<svg className={className} viewBox="0 0 24 24" aria-label="MongoDB">
        <path d="M12 2s3 3.5 3 8-2 9-3 12c-1-3-3-7-3-12S12 2 12 2z" fill="#10B981"/><path d="M12 2v20" stroke="#065F46" strokeWidth="1.2"/>
      </svg>);
    case "mysql":
      return (<svg className={className} viewBox="0 0 24 24" aria-label="MySQL">
        <path d="M4 18c1.5-3.5 4.5-6 8-6s6.5 2.5 8 6" fill="none" stroke="#00758F" strokeWidth="1.5"/>
        <circle cx="8" cy="9" r="2" fill="#F29111"/><circle cx="16" cy="9" r="2" fill="#F29111"/>
      </svg>);
    case "postgres":
      return (<svg className={className} viewBox="0 0 24 24" aria-label="PostgreSQL">
        <path d="M12 4c5 0 8 3 8 6.5S17 18 12 18 4 14.5 4 10.5 7 4 12 4z" fill="#336791"/>
        <path d="M12 8c-2.5 0-4 1.2-4 2.5S9.5 13 12 13s4-1.2 4-2.5S14.5 8 12 8z" fill="#fff"/>
      </svg>);
    case "docker":
      return (<svg className={className} viewBox="0 0 24 24" aria-label="Docker">
        <rect x="4" y="12" width="16" height="5" rx="1" fill="#1D63ED"/><rect x="6" y="9" width="3" height="3" fill="#1D63ED"/><rect x="10" y="9" width="3" height="3" fill="#1D63ED"/><rect x="14" y="9" width="3" height="3" fill="#1D63ED"/>
      </svg>);
    case "nginx":
      return (<svg className={className} viewBox="0 0 24 24" aria-label="Nginx">
        <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" fill="#0EA5E9"/><path d="M8 8v8l8-8v8" stroke="#fff" strokeWidth="1.6" fill="none"/>
      </svg>);
    case "git":
      return (<svg className={className} viewBox="0 0 24 24" aria-label="Git">
        <path d="M3 12l9-9 9 9-9 9-9-9z" fill="#F05032"/><circle cx="12" cy="7" r="1.3" fill="#fff"/><circle cx="15" cy="12" r="1.3" fill="#fff"/><circle cx="9" cy="12" r="1.3" fill="#fff"/><path d="M12 7v5m0 0h3M12 12H9" stroke="#fff" strokeWidth="1.2"/>
      </svg>);
    case "linux":
      return (<svg className={className} viewBox="0 0 24 24" aria-label="Linux">
        <path d="M12 4c2.5 0 4 2 4 4.5S14.5 13 12 13 8 11 8 8.5 9.5 4 12 4z" fill="#111827"/><circle cx="10.5" cy="8.5" r="0.6" fill="#fff"/><circle cx="13.5" cy="8.5" r="0.6" fill="#fff"/><path d="M7 18c1.5-2.5 4-3 5-3s3.5.5 5 3" stroke="#111827" strokeWidth="1.4" fill="none"/>
      </svg>);
    default: return null;
  }
}
