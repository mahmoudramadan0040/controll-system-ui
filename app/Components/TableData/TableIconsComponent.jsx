import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDownWideShort,
  faBars,
  faBarsStaggered,
  faColumns,
  faCompress,
  faEllipsisH,
  faEllipsisVertical,
  faExpand,
  faEyeSlash,
  faFilter,
  faFilterCircleXmark,
  faGripLines,
  faSearch,
  faSearchMinus,
  faSortDown,
  faThumbTack,
} from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

function TableIcons() {
    const IconsColor = "text-emerald-200"
    const fontAwesomeIcons= {
        ArrowDownwardIcon: (props) => (
          <FontAwesomeIcon icon={faSortDown} {...props} />
        ),
        ClearAllIcon: () => <FontAwesomeIcon className={IconsColor} icon={faBarsStaggered} />,
        DensityLargeIcon: () => <FontAwesomeIcon className={IconsColor} icon={faGripLines} />,
        DensityMediumIcon: () => <FontAwesomeIcon className={IconsColor}  icon={faBars} />,
        DensitySmallIcon: () => <FontAwesomeIcon className={IconsColor}  icon={faBars} />,
        DragHandleIcon: () => <FontAwesomeIcon className={IconsColor}  icon={faGripLines} />,
        FilterListIcon: (props) => <FontAwesomeIcon className={IconsColor}  icon={faFilter} {...props} />,
        FilterListOffIcon: () => <FontAwesomeIcon className={IconsColor}  icon={faFilterCircleXmark} />,
        FullscreenExitIcon: () => <FontAwesomeIcon className={IconsColor} icon={faCompress} />,
        FullscreenIcon: () => <FontAwesomeIcon className={IconsColor}  icon={faExpand} />,
        SearchIcon: (props) => <FontAwesomeIcon className={IconsColor}  icon={faSearch} {...props} />,
        SearchOffIcon: () => <FontAwesomeIcon className={IconsColor}  icon={faSearchMinus} />,
        ViewColumnIcon: () => <FontAwesomeIcon className={IconsColor}  icon={faColumns} />,
        MoreVertIcon: () => <FontAwesomeIcon className={IconsColor}  icon={faEllipsisVertical} />,
        MoreHorizIcon: () => <FontAwesomeIcon className={IconsColor}  icon={faEllipsisH} />,
        SortIcon: (props) => (
          <FontAwesomeIcon className={IconsColor}  icon={faArrowDownWideShort} {...props} /> //props so that style rotation transforms are applied
        ),
        PushPinIcon: (props) => (
          <FontAwesomeIcon className={IconsColor}  icon={faThumbTack} {...props} /> //props so that style rotation transforms are applied
        ),
        VisibilityOffIcon: () => <FontAwesomeIcon  className={IconsColor}  icon={faEyeSlash} />,
      };
    return ( 
        fontAwesomeIcons
    );
}

export default TableIcons;