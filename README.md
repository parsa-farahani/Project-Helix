**Note: 
in this project, I also used 'Beluga',
my small CSS-library which I've created it using 'SASS(SCSS)'
* Extra 'Beluga' styles(which are not used by markup), will be purged using 'purgeCSS' library
* Also you can override the variabels of 'Beluga', by initializing them before: @import 'sass_lib_name'

** Widgets:
* js: prebuilt 'widgets' which are created as 'class', are imported (using ES6 Modules) to one file: 'js/widgets.js', and this file can be linked to each page which we need to use the widgets inside that.
* css: css file of widgets is: 'css/widgets.css' which all .css files of prebuilt widgets are imported inside it by '@import', so we can link this file in any page which we need widgets there.'

** This project is designed and made completely by myself, using pure: HTML, CSS(SASS), Javascript,  without even 1 line of Tailwind, Bootstrap, ... (all of transforms, 3d stuff/animations, sticky-scrollbased-animation(which is made by a widget which i made earlier and added to this project), ...)

** This project is 'responsive' for mobiles, tablets, desktops, and larger screens

** I've tried my best to keep the project 'Accessible', of course no one can do it 100%, but I've tried to make this project Accessible for all people

** used technologies:
HTML semantic elements
HTML Accessibility attributes
SVG
SVG filters(grain filter for section '#intro')
CSS clip-path
CSS mask-*
CSS Grid, flex, columns (section '#latest-projects' layout)
CSS transform(2d/3d): (section '#intro' (cube), section '#dynamic-layout', section '#process' (sticy-scrollbased-animation))
CSS Animations: (section '#intro' (title typing-effect, cube), section '#dynamic-layout', )
Web Animation API: ( section '#mobile-layout', slider-progress, section '#process' (sticky-scrollbased-animation))
IntersectionObserver: (sections, section '#latest-projects' appearance, ..)
ViewTimeline API: (section '#mobile-layout' animation-timeline, section '#process' - for its 'sticky-scrollbased-animation' (design studio introduction),  )
and also 'Javascript' to overal site handling (Events, setting animations, ...)