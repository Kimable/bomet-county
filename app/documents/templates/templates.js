export const letter = {
  ops: [
    {
      attributes: {
        color: "#008a00",
        bold: true,
      },
      insert: "___________________________________________",
    },
    {
      attributes: {
        header: {
          $numberInt: "1",
        },
      },
      insert: "\n",
    },
    {
      insert: "\n\n",
    },
    {
      attributes: {
        background: "transparent",
        color: "#353744",
        bold: true,
      },
      insert: "Your Name",
    },
    {
      insert: "\n",
    },
    {
      attributes: {
        background: "transparent",
        color: "#666666",
      },
      insert: "123 Your Street",
    },
    {
      insert: "\n",
    },
    {
      attributes: {
        background: "transparent",
        color: "#666666",
      },
      insert: "Your City, ST 12345",
    },
    {
      insert: "\n",
    },
    {
      attributes: {
        background: "transparent",
        color: "#666666",
      },
      insert: "(123) 456-7890",
    },
    {
      insert: "\n",
    },
    {
      attributes: {
        background: "transparent",
        color: "#666666",
      },
      insert: "no_reply@example.com",
    },
    {
      insert: "\n\n",
    },
    {
      attributes: {
        background: "transparent",
        color: "#353744",
      },
      insert: "4th September 20XX",
    },
    {
      insert: "\n",
    },
    {
      attributes: {
        background: "transparent",
        color: "#353744",
        bold: true,
      },
      insert: "Ronny Reader",
    },
    {
      insert: "\n",
    },
    {
      attributes: {
        background: "transparent",
        color: "#353744",
      },
      insert: "CEO, Company Name",
    },
    {
      insert: "\n",
    },
    {
      attributes: {
        background: "transparent",
        color: "#353744",
      },
      insert: "123 Address St ",
    },
    {
      insert: "\n",
    },
    {
      attributes: {
        background: "transparent",
        color: "#353744",
      },
      insert: "Anytown, ST 12345",
    },
    {
      insert: "\n\n",
    },
    {
      attributes: {
        background: "transparent",
        color: "#353744",
      },
      insert: "Dear Ms. Reader,",
    },
    {
      insert: "\n",
    },
    {
      attributes: {
        background: "transparent",
        color: "#353744",
      },
      insert:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
    },
    {
      insert: "\n\n",
    },
    {
      attributes: {
        background: "transparent",
        color: "#353744",
      },
      insert:
        "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.",
    },
    {
      insert: "\n\n",
    },
    {
      attributes: {
        background: "transparent",
        color: "#353744",
      },
      insert:
        "Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius.",
    },
    {
      insert: "\n\n\n",
    },
    {
      attributes: {
        background: "transparent",
        color: "#353744",
      },
      insert: "Sincerely,",
    },
    {
      insert: "\n\n",
    },
    {
      attributes: {
        background: "transparent",
        color: "#008a00",
        bold: true,
      },
      insert: "Your Name",
    },
    {
      insert: "\n",
    },
  ],
};

export const cv = {
  ops: [
    {
      attributes: {
        underline: true,
        background: "transparent",
        color: "#f06666",
        font: "serif",
        bold: true,
      },
      insert: "[Your Name] Curriculum Vitae",
    },
    {
      attributes: { align: "center", header: { $numberInt: "1" } },
      insert: "\n",
    },
    { attributes: { align: "center" }, insert: "\n\n" },
    {
      attributes: { background: "transparent", color: "#000000", bold: true },
      insert: "Your Name",
    },
    { insert: "\n" },
    {
      attributes: { background: "transparent", color: "#000000" },
      insert: "P.O Box 123 - 00100",
    },
    { insert: "\n" },
    {
      attributes: { background: "transparent", color: "#000000" },
      insert: "Nairobi",
    },
    { insert: "\n+254 719 849455\n" },
    {
      attributes: { background: "transparent", color: "#000000", bold: true },
      insert: "kk@example.com",
    },
    { insert: "\n\n" },
    {
      attributes: { background: "transparent", color: "#f06666", bold: true },
      insert: "Skills",
    },
    { attributes: { header: { $numberInt: "2" } }, insert: "\n" },
    {
      attributes: { background: "transparent", color: "#000000" },
      insert:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac interdum nisi. Sed in consequat mi. Sed pulvinar lacinia felis eu finibus.",
    },
    { insert: "\n\n" },
    {
      attributes: { background: "transparent", color: "#f06666", bold: true },
      insert: "Work Experience",
    },
    { attributes: { header: { $numberInt: "2" } }, insert: "\n" },
    {
      attributes: { background: "transparent", color: "#888888", bold: true },
      insert: "20XX - PRESENT",
    },
    { attributes: { header: { $numberInt: "3" } }, insert: "\n" },
    {
      attributes: { background: "transparent", color: "#000000", bold: true },
      insert: "Company Name, Location",
    },
    {
      attributes: {
        background: "transparent",
        color: "#000000",
        italic: true,
      },
      insert: " - Job Title",
    },
    { attributes: { header: { $numberInt: "3" } }, insert: "\n" },
    {
      attributes: { background: "transparent", color: "#000000" },
      insert: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    },
    { attributes: { list: "bullet" }, insert: "\n" },
    {
      attributes: { background: "transparent", color: "#000000" },
      insert: "Aenean ac interdum nisi. Sed in consequat mi.",
    },
    { attributes: { list: "bullet" }, insert: "\n" },
    {
      attributes: { background: "transparent", color: "#000000" },
      insert: "Sed in consequat mi, sed pulvinar lacinia felis eu finibus.",
    },
    { attributes: { list: "bullet" }, insert: "\n" },
    { insert: "\n" },
    {
      attributes: { background: "transparent", color: "#888888", bold: true },
      insert: "20XX - 20XX",
    },
    { attributes: { header: { $numberInt: "3" } }, insert: "\n" },
    {
      attributes: { background: "transparent", color: "#000000", bold: true },
      insert: "Company Name, Location",
    },
    {
      attributes: {
        background: "transparent",
        color: "#000000",
        italic: true,
      },
      insert: " - Job Title",
    },
    { attributes: { header: { $numberInt: "3" } }, insert: "\n" },
    {
      attributes: { background: "transparent", color: "#000000" },
      insert: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    },
    { attributes: { list: "bullet" }, insert: "\n" },
    {
      attributes: { background: "transparent", color: "#000000" },
      insert: "Aenean ac interdum nisi. Sed in consequat mi. ",
    },
    { attributes: { list: "bullet" }, insert: "\n" },
    { attributes: { header: { $numberInt: "3" } }, insert: "\n" },
    {
      attributes: { background: "transparent", color: "#888888", bold: true },
      insert: "20XX - 20XX",
    },
    { attributes: { header: { $numberInt: "3" } }, insert: "\n" },
    {
      attributes: { background: "transparent", color: "#000000", bold: true },
      insert: "Company Name,",
    },
    {
      attributes: {
        background: "transparent",
        color: "#000000",
        italic: true,
      },
      insert: " - Job Title",
    },
    { attributes: { header: { $numberInt: "3" } }, insert: "\n" },
    {
      attributes: { background: "transparent", color: "#000000" },
      insert: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    },
    { attributes: { list: "bullet" }, insert: "\n" },
    {
      attributes: { background: "transparent", color: "#000000" },
      insert: "Aenean ac interdum nisi. Sed in consequat mi. ",
    },
    { attributes: { list: "bullet" }, insert: "\n" },
    {
      attributes: { background: "transparent", color: "#000000" },
      insert: "Sed pulvinar lacinia felis eu finibus. ",
    },
    { attributes: { list: "bullet" }, insert: "\n" },
    { insert: "\n" },
    {
      attributes: { background: "transparent", color: "#f06666", bold: true },
      insert: "Education Background",
    },
    { attributes: { header: { $numberInt: "2" } }, insert: "\n" },
    {
      attributes: { background: "transparent", color: "#888888", bold: true },
      insert: "20XX - 20XX",
    },
    { attributes: { header: { $numberInt: "3" } }, insert: "\n" },
    {
      attributes: { background: "transparent", color: "#000000", bold: true },
      insert: "College Name, Location",
    },
    {
      attributes: {
        background: "transparent",
        color: "#000000",
        italic: true,
      },
      insert: " - Degree",
    },
    { attributes: { header: { $numberInt: "3" } }, insert: "\n" },
    { insert: "\n" },
    {
      attributes: { background: "transparent", color: "#000000" },
      insert:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore.",
    },
    { insert: "\n\n" },
    {
      attributes: { background: "transparent", color: "#f06666", bold: true },
      insert: "Referees",
    },
    { attributes: { header: { $numberInt: "2" } }, insert: "\n" },
    { attributes: { bold: true }, insert: "1)   Kelvin Kimani " },
    { insert: "\t\t\t\t\t\t\t\t\t\t\t" },
    { attributes: { bold: true }, insert: "2)  John Smith" },
    { insert: "\n" },
    { attributes: { bold: true }, insert: "      0719 849 455" },
    { insert: "\t\t\t\t\t\t\t\t\t\t\t\t " },
    { attributes: { bold: true }, insert: "0712345678" },
    { insert: "\n" },
  ],
};

export const minutes = {
  ops: [
    { attributes: { color: "#ff9900", bold: true }, insert: "________" },
    { attributes: { color: "#008a00", bold: true }, insert: "__________" },
    {
      attributes: { color: "#e60000", bold: true },
      insert: "______________",
    },
    { attributes: { color: "#9933ff", bold: true }, insert: "___________" },
    { attributes: { header: { $numberInt: "1" } }, insert: "\n" },
    { insert: "\n" },
    {
      attributes: {
        background: "transparent",
        color: "#444444",
        font: "serif",
        bold: true,
      },
      insert: "Annual Board Meeting",
    },
    { attributes: { header: { $numberInt: "1" } }, insert: "\n" },
    {
      attributes: { background: "transparent", color: "#695d46" },
      insert: "Friday, 09.04.20XX",
    },
    { insert: "\n" },
    {
      attributes: { background: "transparent", color: "#695d46", bold: true },
      insert: "─",
    },
    { insert: "\n\n" },
    {
      attributes: { background: "transparent", color: "#e60000", bold: true },
      insert: "Attendees",
    },
    { attributes: { header: { $numberInt: "2" } }, insert: "\n" },
    {
      attributes: { background: "transparent", color: "#695d46" },
      insert: "Joseph Kiarie, ",
    },
    {
      attributes: {
        background: "transparent",
        color: "#695d46",
        italic: true,
      },
      insert: "CEO",
    },
    { insert: "\n" },
    {
      attributes: { background: "transparent", color: "#695d46" },
      insert: "Fred Mathi, ",
    },
    {
      attributes: {
        background: "transparent",
        color: "#695d46",
        italic: true,
      },
      insert: "CFO",
    },
    { insert: "\n" },
    {
      attributes: {
        background: "transparent",
        color: "#695d46",
        italic: true,
      },
      insert: "Kelvin Kimani, CTO",
    },
    { insert: "\n\n" },
    {
      attributes: { background: "transparent", color: "#e60000", bold: true },
      insert: "Agenda",
    },
    { attributes: { header: { $numberInt: "2" } }, insert: "\n" },
    {
      attributes: { background: "transparent", color: "#008575", bold: true },
      insert: "Last Meeting Follow-up",
    },
    { attributes: { header: { $numberInt: "3" } }, insert: "\n" },
    {
      attributes: { background: "transparent", color: "#695d46" },
      insert: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. ",
    },
    { attributes: { list: "ordered" }, insert: "\n" },
    {
      attributes: { background: "transparent", color: "#008575", bold: true },
      insert: "New Business",
    },
    { attributes: { header: { $numberInt: "3" } }, insert: "\n" },
    {
      attributes: { background: "transparent", color: "#695d46" },
      insert: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. ",
    },
    { attributes: { list: "ordered" }, insert: "\n" },
    {
      attributes: { background: "transparent", color: "#695d46" },
      insert: "Suspendisse scelerisque mi a mi. ",
    },
    { attributes: { list: "ordered" }, insert: "\n" },
    { insert: "\n" },
    {
      attributes: { background: "transparent", color: "#e60000", bold: true },
      insert: "Notes",
    },
    { attributes: { header: { $numberInt: "2" } }, insert: "\n" },
    {
      attributes: { background: "transparent", color: "#695d46", bold: true },
      insert: "Lorem ipsum dolor sit amet",
    },
    {
      attributes: { background: "transparent", color: "#695d46" },
      insert: " consectetuer adipiscing elit. ",
    },
    { attributes: { list: "bullet" }, insert: "\n" },
    {
      attributes: { background: "transparent", color: "#695d46", bold: true },
      insert: "Vestibulum ante",
    },
    {
      attributes: { background: "transparent", color: "#695d46" },
      insert:
        " ipsum primis elementum, libero interdum auctor cursus, sapien enim dictum quam. ",
    },
    { attributes: { list: "bullet" }, insert: "\n" },
    {
      attributes: { background: "transparent", color: "#695d46" },
      insert: "Phasellus vehicula nonummy nunc.",
    },
    {
      attributes: { indent: { $numberInt: "1" }, list: "bullet" },
      insert: "\n",
    },
    { insert: "\n" },
    {
      attributes: { background: "transparent", color: "#e60000", bold: true },
      insert: "Action Items",
    },
    { attributes: { header: { $numberInt: "2" } }, insert: "\n" },
    {
      attributes: { background: "transparent", color: "#695d46" },
      insert: "Lorem ipsum dolor sit amet consectetuer adipiscing elit. ",
    },
    { attributes: { list: "ordered" }, insert: "\n" },
    { insert: "\n\n" },
    {
      attributes: { background: "transparent", color: "#e60000", bold: true },
      insert: "Next Meeting Agenda Items",
    },
    { attributes: { header: { $numberInt: "2" } }, insert: "\n" },
    {
      attributes: { background: "transparent", color: "#695d46" },
      insert: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    },
    { insert: "\n\n\n\n\n\n\n\n\n\n\n" },
    {
      attributes: { background: "transparent", color: "#e60000", bold: true },
      insert: "___________________________________________",
    },
    { attributes: { header: { $numberInt: "1" } }, insert: "\n" },
  ],
};
