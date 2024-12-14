import { Navigate } from 'react-router-dom';
// auth
import AuthGuard from '../api/AuthGuard';
import GuestGuard from '../api/GuestGuard';
// layouts
import MainLayout from '../layouts/main';
import SimpleLayout from '../layouts/simple';
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';

// config
import { PATH_AFTER_LOGIN, PATH_STUDENT_AFTER_LOGIN } from '../config-global';
//
import {
  // Auth
  LoginPage,
  RegisterPage,
  VerifyCodePage,
  NewPasswordPage,
  ResetPasswordPage,
  // Dashboard: General
  GeneralAppPage,
  GeneralFilePage,
  GeneralBankingPage,
  GeneralBookingPage,
  GeneralEcommercePage,
  GeneralAnalyticsPage,
  // Dashboard: User
  UserListPage,
  UserEditPage,
  UserCardsPage,
  UserCreatePage,
  UserProfilePage,
  UserAccountPage,
  // Dashboard: Ecommerce
  EcommerceShopPage,
  EcommerceCheckoutPage,
  EcommerceProductListPage,
  EcommerceProductEditPage,
  EcommerceProductCreatePage,
  EcommerceProductDetailsPage,
  // Dashboard: Invoice
  InvoiceListPage,
  InvoiceDetailsPage,
  InvoiceCreatePage,
  InvoiceEditPage,
  // Dashboard: Blog
  BlogPostsPage,
  BlogPostPage,
  BlogNewPostPage,
  // Dashboard: FileManager
  FileManagerPage,
  // Dashboard: App
  ChatPage,
  MailPage,
  CalendarPage,
  KanbanPage,
  //
  BlankPage,
  PermissionDeniedPage,
  //
  Page500,
  Page403,
  Page404,
  HomePage,
  FaqsPage,
  AboutPage,
  Contact,
  PricingPage,
  PaymentPage,
  ComingSoonPage,
  MaintenancePage,
  //
  ComponentsOverviewPage,
  FoundationColorsPage,
  FoundationTypographyPage,
  FoundationShadowsPage,
  FoundationGridPage,
  FoundationIconsPage,
  //
  MUIAccordionPage,
  MUIAlertPage,
  MUIAutocompletePage,
  MUIAvatarPage,
  MUIBadgePage,
  MUIBreadcrumbsPage,
  MUIButtonsPage,
  MUICheckboxPage,
  MUIChipPage,
  MUIDataGridPage,
  MUIDialogPage,
  MUIListPage,
  MUIMenuPage,
  MUIPaginationPage,
  MUIPickersPage,
  MUIPopoverPage,
  MUIProgressPage,
  MUIRadioButtonsPage,
  MUIRatingPage,
  MUISliderPage,
  MUIStepperPage,
  MUISwitchPage,
  MUITablePage,
  MUITabsPage,
  MUITextFieldPage,
  MUITimelinePage,
  MUITooltipPage,
  MUITransferListPage,
  MUITreesViewPage,
  //
  DemoAnimatePage,
  DemoCarouselsPage,
  DemoChartsPage,
  DemoCopyToClipboardPage,
  DemoEditorPage,
  DemoFormValidationPage,
  DemoImagePage,
  DemoLabelPage,
  DemoLightboxPage,
  DemoMapPage,
  DemoMegaMenuPage,
  DemoMultiLanguagePage,
  DemoNavigationBarPage,
  DemoOrganizationalChartPage,
  DemoScrollbarPage,
  DemoSnackbarPage,
  DemoTextMaxLinePage,
  DemoUploadPage,
  DemoMarkdownPage,
  //
  QuestionPage,
  QuestionListPage,
  TaskPage,
  TaskListPage,
  LessonPage,
  LessonListPage,
  ClassListPage,
  ClassPage,
  TestListPage,
  TestPage,
  ListTestPage,
  ListLessionPage,
  MyClassPage,
  AllClassPage,
  LiveClassPage,
  DailyPage,
  ChatAIPage,
  DetailClassPage,
  DetailLessionPage,
  DetailTestPage,
  StudentManagerPage,
  StudentPostsPage,
} from './elements';

const RouteApps = [
  // Auth
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        element: (
          <GuestGuard>
            <LoginPage />
          </GuestGuard>
        ),
      },
      {
        path: 'register',
        element: (
          <GuestGuard>
            <RegisterPage />
          </GuestGuard>
        ),
      },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      {
        element: <CompactLayout />,
        children: [
          { path: 'reset-password', element: <ResetPasswordPage /> },
          { path: 'new-password', element: <NewPasswordPage /> },
          { path: 'verify', element: <VerifyCodePage /> },
        ],
      },
    ],
  },

  // Dashboard
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
      // { path: 'app', element: <GeneralAppPage /> },
      // { path: 'ecommerce', element: <GeneralEcommercePage /> },
      // { path: 'analytics', element: <GeneralAnalyticsPage /> },
      // { path: 'banking', element: <GeneralBankingPage /> },
      // { path: 'booking', element: <GeneralBookingPage /> },
      // { path: 'file', element: <GeneralFilePage /> },
      {
        path: 'e-commerce',
        children: [
          { element: <Navigate to="/dashboard/e-commerce/shop" replace />, index: true },
          { path: 'shop', element: <EcommerceShopPage /> },
          { path: 'product/:name', element: <EcommerceProductDetailsPage /> },
          { path: 'list', element: <EcommerceProductListPage /> },
          { path: 'product/new', element: <EcommerceProductCreatePage /> },
          { path: 'product/:name/edit', element: <EcommerceProductEditPage /> },
          { path: 'checkout', element: <EcommerceCheckoutPage /> },
        ],
      },
      {
        path: 'user',
        children: [
          { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
          { path: 'profile', element: <UserProfilePage /> },
          { path: 'cards', element: <UserCardsPage /> },
          { path: 'list', element: <UserListPage /> },
          { path: 'new', element: <UserCreatePage /> },
          { path: ':name/edit', element: <UserEditPage /> },
          { path: 'account', element: <UserAccountPage /> },
        ],
      },
      {
        path: 'invoice',
        children: [
          { element: <Navigate to="/dashboard/invoice/list" replace />, index: true },
          { path: 'list', element: <InvoiceListPage /> },
          { path: ':id', element: <InvoiceDetailsPage /> },
          { path: ':id/edit', element: <InvoiceEditPage /> },
          { path: 'new', element: <InvoiceCreatePage /> },
        ],
      },
      {
        path: 'Question',
        children: [
          { element: <Navigate to="/dashboard/question/list" replace />, index: true },
          { path: 'list', element: <QuestionListPage /> },
          { path: 'list/:title', element: <BlogPostPage /> },
          { path: 'new', element: <QuestionPage /> },
        ],
      },
      {
        path: 'Task',
        children: [
          { element: <Navigate to="/dashboard/task/list" replace />, index: true },
          { path: 'list', element: <TaskListPage /> },
          { path: 'task/:title', element: <BlogPostPage /> },
          { path: 'new', element: <TaskPage /> },
        ],
      },
      {
        path: 'Test',
        children: [
          { element: <Navigate to="/dashboard/test/list" replace />, index: true },
          { path: 'list', element: <TestListPage /> },
          { path: 'test/:title', element: <BlogPostPage /> },
          { path: 'new', element: <TestPage /> },
        ],
      },
      {
        path: 'Lesson',
        children: [
          { element: <Navigate to="/dashboard/lession/list" replace />, index: true },
          { path: 'list', element: <LessonListPage /> },
          { path: 'lesson/:title', element: <BlogPostPage /> },
          { path: 'new', element: <LessonPage /> },
        ],
      },
      {
        path: 'Class',
        children: [
          { element: <Navigate to="/dashboard/class/list" replace />, index: true },
          { path: 'list', element: <ClassListPage /> },
          { path: 'class/:title', element: <BlogPostPage /> },
          { path: 'new', element: <ClassPage /> },
          { path: 'live', element: <LiveClassPage /> },
        ],
      },
      { path: 'files-manager', element: <FileManagerPage /> },
      {
        path: 'students-manager',
        children: [
          { element: <Navigate to="/dashboard/students-manager/class" replace />, index: true },
          { path: 'class', element: <StudentManagerPage /> },
          { path: 'record/:idClass/:type/:idType', element: <StudentPostsPage /> },
        ],
      },
      {
        path: 'mail',
        children: [
          { element: <Navigate to="/dashboard/mail/all" replace />, index: true },
          { path: 'label/:customLabel', element: <MailPage /> },
          { path: 'label/:customLabel/:mailId', element: <MailPage /> },
          { path: ':systemLabel', element: <MailPage /> },
          { path: ':systemLabel/:mailId', element: <MailPage /> },
        ],
      },
      {
        path: 'chat',
        children: [{ element: <ChatPage />, index: true }],
      },
      {
        path: 'ai',
        children: [{ element: <ChatAIPage />, index: true }],
      },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'kanban', element: <KanbanPage /> },
      { path: 'permission-denied', element: <PermissionDeniedPage /> },
      { path: 'blank', element: <BlankPage /> },
    ],
  },

  // Main Routes
  {
    element: <MainLayout />,
    children: [
      { element: <HomePage />, index: true },
      { path: 'about-us', element: <AboutPage /> },
      { path: 'contact-us', element: <Contact /> },
      { path: 'faqs', element: <FaqsPage /> },
      // Demo Components
      {
        path: 'components',
        children: [
          { element: <ComponentsOverviewPage />, index: true },
          {
            path: 'foundation',
            children: [
              { element: <Navigate to="/components/foundation/colors" replace />, index: true },
              { path: 'colors', element: <FoundationColorsPage /> },
              { path: 'typography', element: <FoundationTypographyPage /> },
              { path: 'shadows', element: <FoundationShadowsPage /> },
              { path: 'grid', element: <FoundationGridPage /> },
              { path: 'icons', element: <FoundationIconsPage /> },
            ],
          },
          {
            path: 'mui',
            children: [
              { element: <Navigate to="/components/mui/accordion" replace />, index: true },
              { path: 'accordion', element: <MUIAccordionPage /> },
              { path: 'alert', element: <MUIAlertPage /> },
              { path: 'autocomplete', element: <MUIAutocompletePage /> },
              { path: 'avatar', element: <MUIAvatarPage /> },
              { path: 'badge', element: <MUIBadgePage /> },
              { path: 'breadcrumbs', element: <MUIBreadcrumbsPage /> },
              { path: 'buttons', element: <MUIButtonsPage /> },
              { path: 'checkbox', element: <MUICheckboxPage /> },
              { path: 'chip', element: <MUIChipPage /> },
              { path: 'data-grid', element: <MUIDataGridPage /> },
              { path: 'dialog', element: <MUIDialogPage /> },
              { path: 'list', element: <MUIListPage /> },
              { path: 'menu', element: <MUIMenuPage /> },
              { path: 'pagination', element: <MUIPaginationPage /> },
              { path: 'pickers', element: <MUIPickersPage /> },
              { path: 'popover', element: <MUIPopoverPage /> },
              { path: 'progress', element: <MUIProgressPage /> },
              { path: 'radio-button', element: <MUIRadioButtonsPage /> },
              { path: 'rating', element: <MUIRatingPage /> },
              { path: 'slider', element: <MUISliderPage /> },
              { path: 'stepper', element: <MUIStepperPage /> },
              { path: 'switch', element: <MUISwitchPage /> },
              { path: 'table', element: <MUITablePage /> },
              { path: 'tabs', element: <MUITabsPage /> },
              { path: 'textfield', element: <MUITextFieldPage /> },
              { path: 'timeline', element: <MUITimelinePage /> },
              { path: 'tooltip', element: <MUITooltipPage /> },
              { path: 'transfer-list', element: <MUITransferListPage /> },
              { path: 'tree-view', element: <MUITreesViewPage /> },
            ],
          },
          {
            path: 'extra',
            children: [
              { element: <Navigate to="/components/extra/animate" replace />, index: true },
              { path: 'animate', element: <DemoAnimatePage /> },
              { path: 'carousel', element: <DemoCarouselsPage /> },
              { path: 'chart', element: <DemoChartsPage /> },
              { path: 'copy-to-clipboard', element: <DemoCopyToClipboardPage /> },
              { path: 'editor', element: <DemoEditorPage /> },
              { path: 'form-validation', element: <DemoFormValidationPage /> },
              { path: 'image', element: <DemoImagePage /> },
              { path: 'label', element: <DemoLabelPage /> },
              { path: 'lightbox', element: <DemoLightboxPage /> },
              { path: 'map', element: <DemoMapPage /> },
              { path: 'mega-menu', element: <DemoMegaMenuPage /> },
              { path: 'multi-language', element: <DemoMultiLanguagePage /> },
              { path: 'navigation-bar', element: <DemoNavigationBarPage /> },
              { path: 'organization-chart', element: <DemoOrganizationalChartPage /> },
              { path: 'scroll', element: <DemoScrollbarPage /> },
              { path: 'snackbar', element: <DemoSnackbarPage /> },
              { path: 'text-max-line', element: <DemoTextMaxLinePage /> },
              { path: 'upload', element: <DemoUploadPage /> },
              { path: 'markdown', element: <DemoMarkdownPage /> },
            ],
          },
        ],
      },
    ],
  },
  {
    element: <SimpleLayout />,
    children: [
      { path: 'pricing', element: <PricingPage /> },
      { path: 'payment', element: <PaymentPage /> },
    ],
  },
  {
    element: <CompactLayout />,
    children: [
      { path: 'coming-soon', element: <ComingSoonPage /> },
      { path: 'maintenance', element: <MaintenancePage /> },
      { path: '500', element: <Page500 /> },
      { path: '404', element: <Page404 /> },
      { path: '403', element: <Page403 /> },
    ],
  },
  // Student Routes
  {
    path: 'student',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      { element: <Navigate to={PATH_STUDENT_AFTER_LOGIN} replace />, index: true },
      {
        path: 'class',
        children: [
          { element: <Navigate to="/student/list-my-class" replace />, index: true },
          { path: 'my-class', element: <MyClassPage /> },
          { path: 'list-all', element: <AllClassPage /> },
          { path: 'live-class', element: <LiveClassPage /> },
          { path: 'my-class/:idClass/:nameClass', element: <DetailClassPage /> },
          { path: 'my-class/:idClass/:nameClass/:idLession', element: <DetailLessionPage /> },
          { path: 'my-class/:idClass/:nameClass/test/:idTest', element: <DetailTestPage /> },
        ],
      },
      // {
      //   path: 'test',
      //   children: [
      //     { element: <Navigate to="/student/test/list" replace />, index: true },
      //     { path: 'list', element: <ListTestPage /> },
      //     { path: 'detail/:idTest', element: <h1> test detail</h1> },
      //   ],
      // },
      // {
      //   path: 'lession',
      //   children: [
      //     { element: <Navigate to="/student/lession/list" replace />, index: true },
      //     { path: 'list', element: <ListLessionPage /> },
      //     { path: 'detail/:idLession', element: <h1>lession detail</h1> },
      //   ],
      // },
      {
        path: 'daily',
        children: [{ element: <DailyPage />, index: true }],
      },
      {
        path: 'chat',
        children: [{ element: <ChatPage />, index: true }],
      },
      {
        path: 'ai',
        children: [{ element: <ChatAIPage />, index: true }],
      },
    ],
  },
  { path: '*', element: <Navigate to="/404" replace /> },
];
export default RouteApps;
