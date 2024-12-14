// routes
// components
import { PATH_STUDENT } from 'src/routes/pathsStudent';
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navStudentConfig = [
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Activity',
    items: [
      {
        title: 'Class',
        path: PATH_STUDENT.class.root,
        icon: ICONS.blog,
        children: [
          { title: 'All Class', path: PATH_STUDENT.class.listAll },
          { title: 'My Class', path: PATH_STUDENT.class.listMyClass },
          { title: 'Live Class', path: PATH_STUDENT.class.liveClass },
        ],
      },
      {
        title: 'Daily',
        path: PATH_STUDENT.daily.root,
        icon: ICONS.calendar,
      },
      // {
      //   title: 'Lession Manager',
      //   path: PATH_STUDENT.lession.root,
      //   icon: ICONS.dashboard,
      //   children: [
      //     { title: 'list lession', path: PATH_STUDENT.lession.list },
      //   ],
      // },
      // {
      //   title: 'Tests',
      //   path: PATH_STUDENT.test.root,
      //   icon: ICONS.folder,
      //   children: [
      //     { title: 'list test', path: PATH_STUDENT.test.list },
      //   ],
      // },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'Communication',
    items: [
      {
        title: 'chat with AI',
        path: PATH_STUDENT.chat.ai,
        icon: ICONS.user,
      },
      {
        title: 'chat with teacher',
        path: PATH_STUDENT.chat.teacher,
        icon: ICONS.chat,
      },
    ],
  },
];

export default navStudentConfig;
