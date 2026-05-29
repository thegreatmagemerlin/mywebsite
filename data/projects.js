/* ============================================================
   data/projects.js — Single source of truth for all projects.

   HOW TO ADD A NEW PROJECT:
   1. Copy one of the existing project objects below
   2. Fill in your details (see field guide below)
   3. Set featured: true if you want it on the homepage (max 4)
   4. Create a new file at the path you set in `url`
   5. That's it — it will appear on the projects page automatically

   FIELD GUIDE:
   ┌─────────────┬────────────────────────────────────────────────────┐
   │ id          │ Unique slug, no spaces (e.g. 'pid-controller')     │
   │ title       │ Display title shown on cards and detail pages      │
   │ summary     │ 1-2 sentences shown on project cards               │
   │ description │ Longer description shown on the projects list page │
   │ tags        │ Array of strings — used for filtering              │
   │             │ Use consistent naming: 'Python', not 'python'      │
   │ category    │ Primary category for filter tabs                   │
   │             │ Options: 'Engineering', 'Software', 'Biomedical',  │
   │             │          'Research', 'Other'                       │
   │ year        │ String e.g. '2025'                                 │
   │ status      │ 'Complete', 'In Progress', or 'Archived'          │
   │ featured    │ true/false — shows on homepage (keep to max 4)     │
   │ url         │ Path to the detail page HTML file                  │
   │ thumb       │ Path to thumbnail image (optional, can be null)    │
   └─────────────┴────────────────────────────────────────────────────┘
   ============================================================ */

const PROJECTS = [
  {
    id:          'pid-controller',
    title:       'PID Controller System',
    summary:     'A PID control system built to learn feedback control.',
    description: 'Arduino-based single-axis drone stabilisation system using an MPU6050 and PID control to balance in real time while exploring practical control systems engineering.',
    tags:        ['Control Systems', 'Embedded', 'C++', 'Mechatronics'],
    category:    'Engineering',
    year:        '2026',
    status:      'Complete',
    featured:    true,
    url:         'projects/pid-controller.html',
    thumb:       'assets/images/pid-thumb.png'
  },

  // ── ADD YOUR NEXT PROJECT BELOW THIS LINE ─────────────────

  {
    id:          'open-differential',
    title:       'Open Differential',
    summary:     'A fully 3D-printed open differential designed in SolidWorks, built as part of a broader RC car project.',
    description: 'Designed in SolidWorks and printed in PLA, the differential covers bevel gear design, assembly constraints, and iterative prototyping.',
    tags:        ['CAD', 'Mechanical', '3D Printing'],
    category:    'Engineering',
    year:        '2026',
    status:      'Complete',
    featured:    false,
    url:         'projects/open-differential.html',
    thumb:       null,
  },

  // {
  //   id:          'my-next-project',
  //   title:       'My Next Project',
  //   summary:     'One or two sentences.',
  //   description: 'Longer description for the listing page.',
  //   tags:        ['Tag1', 'Tag2'],
  //   category:    'Software',
  //   year:        '2025',
  //   status:      'In Progress',
  //   featured:    false,
  //   url:         'projects/my-next-project.html',
  //   thumb:       null,
  // },
];