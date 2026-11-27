


// #region Imports

import cssModObj from './hero-map.module.css'; // What: CSS Module Object. Why: The map is styled in its own module, whose class names Vite hashes. How: Each class an element carries is read from this object.

// #endregion Imports



/**
 * hero-map.tsx = Hero Map
 *
 * @summary
 * The home page hero's backdrop: a map of Lake Pomme de Terre, drawn as one
 * inline SVG covering the hero, with the lake's shape, traced by the site's
 * builder, in pale blue, contour lines ringing its shore, and a dotted coral
 * trail following the highway that crosses its east arm, past three navy
 * pins, which drop into place one after another as the page opens. The
 * trail and the pins show above 960px wide. It's decoration behind the
 * hero's words, so it's hidden from screen readers and takes no pointer
 * events.
 *
 * Sections:
 *  - Constants
 *  - Components
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Constants

const LAK_DAT_STR = 'M1046.2 53.7C1029.4 47.4 1008 56.4 1009.2 80.1C1010.7 107 977.1 72.6 966 83.4C954.8 94.3 956.2 121.1 973.6 131.6C982 136.6 952.2 159.5 945.5 146.8C932.9 128.9 910.8 115.7 888.5 120.4C866.9 129 859 152.7 854.8 173.5C853.6 194.2 907 172.1 889.8 193.5C875.2 211.7 882.7 228.3 892.8 242.1C897.5 256.4 876.9 264.7 885 283.5C893.3 302.8 904.7 320.3 911.2 340.1C914.2 349.1 892.9 327.4 878.9 331.2C855.5 337.5 851.8 361.5 848.5 380.3C846.2 396.1 867.4 408.2 839.6 413.1C822.3 416.1 795.6 433.3 802 453.7C808 472.6 842.7 460.4 845 476.9C847.4 493.9 867.3 492.5 855.8 474.4C843.8 455.5 807.3 462.5 810.3 445.7C813.4 428.5 842.2 414.2 862.8 422.8C880.8 436.8 911.5 406.1 879.9 402.8C857.8 397.4 859.8 365 869 351.8C882.3 332.6 905.9 373 924.4 355.6C938.4 338.4 920.6 317.3 915.1 299.8C906.2 287 910.3 283.3 925.1 274.4C941.8 264.4 922.7 236.3 910.6 223.6C886.9 211.2 921.6 189.8 909.5 171.3C898 153.1 919.6 154.7 925.6 167.3C939.2 186.4 964.7 176.1 980.4 166C1001.9 156.1 985.2 122.7 1008.3 116.6C1019 113 1028.8 87.2 1029.8 113.3C1030.6 134.5 1013.9 154.2 1026.4 171.8C1039.6 185.9 1063.2 184.2 1066.1 162.5C1071.5 146.9 1074 133.5 1097.7 139.8C1119.1 145.6 1103.4 147.3 1102 160C1100.9 169.7 1118.6 172 1117.5 187.7C1116.4 204 1132.6 225.5 1152.2 221.7C1157.2 218.7 1182.8 208 1171.3 218C1155.5 231.7 1131.4 236 1123 256.6C1113.3 271.7 1117.5 293.7 1131.6 304.3C1148.9 308.2 1161.5 295.3 1171.9 274.8C1176.2 266.4 1181.3 299.4 1175.9 304.8C1163.7 317 1147.5 325.2 1138.9 341.1C1125.1 359.7 1140.3 370.2 1155.3 360.7C1159.5 358.1 1181.8 364.1 1179.2 358.6C1169.5 338.6 1127.9 371 1140.9 345.1C1146.1 334.9 1170.5 326.4 1182.5 314.1C1194.4 301.8 1203.5 273.1 1184.6 260.8C1160.4 248.8 1162.5 280.9 1153.5 291.8C1125.5 299.9 1131.2 266.4 1142.9 253C1153.8 237 1180.3 238.5 1187.8 221.4C1200.1 193.3 1157 208.7 1140.6 203.5C1125 198.6 1121.7 169.9 1127.4 154.7C1136.4 130.6 1120 126.4 1101.9 120.8C1078.6 113.5 1054.8 121 1053.5 144.8C1052.9 154.2 1036.5 164 1046.3 150C1059.2 131.6 1041.5 109.7 1057.1 95C1075.8 83.5 1064.9 58 1046.2 53.7z'; // What: Lake Data String. Why: The map's lake is the real one, traced from its shoreline. How: This is the tracing's path, scaled into the map's drawing space.



const TRA_DAT_STR = 'M1261.7 -10.7C1266.5 21.3 1259.7 58.2 1232.3 78.5C1215.4 95.9 1200 114.8 1181.5 130.4C1168 150.1 1166.5 182.8 1137.8 187.4C1118.4 195 1087.1 191.2 1079.6 215.3C1073.2 237.4 1081.6 261.2 1073.2 283.1C1066.5 305.4 1058.3 329.1 1065.6 352.3C1072.2 397.3 1074.5 444.4 1060.1 488.2L1052 535'; // What: Trail Data String. Why: The trail follows the highway that runs down the lake's east side, crossing its east arm at the bridge. How: This is its path, starting above the drawing's top edge and ending below its bottom edge.



/**
 * CON_REC_ARR = Contour Record Array
 *
 * @summary
 * The contour lines around the lake, nearest first. Each is the lake's own
 * outline stroked wide and then cut away inside, leaving a thin line that
 * follows the shore at a set distance. Each row is one line:
 *
 *  - `disNum` (number): the line's distance from the shore, in drawing units.
 *
 *  - `ideStr` (string): the ID of the mask that cuts the line's inside away.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/

const CON_REC_ARR = [ // What: Contour Record Array. Why: Contour lines read as a map at a glance. How: Each row names a line's mask and its distance from the shore.


	{ disNum : 10, ideStr : 'conOneMas' }, // What: First Contour Row. Why: The nearest line hugs the shore. How: This sets it 10 units out.
	{ disNum : 24, ideStr : 'conTwoMas' }, // What: Second Contour Row. Why: The lines spread as they leave the shore. How: This sets it 24 units out.
	{ disNum : 42, ideStr : 'conThrMas' }  // What: Third Contour Row. Why: The outermost line ends the rings. How: This sets it 42 units out.


];



const PIN_REC_ARR = [ // What: Pin Record Array. Why: The pins sit along the trail, dropping in from the lowest up. How: Each row names a pin and the drawing-space spot its tip stands on.


	{ ideStr : 'low',  xcoNum : 1069, ycoNum : 380 }, // What: Low Pin Row. Why: The trail's first pin sits south of the lake's east arm. How: This places its tip on the trail there.
	{ ideStr : 'mid',  xcoNum : 1077, ycoNum : 263 }, // What: Middle Pin Row. Why: The trail's second pin sits just past the bridge. How: This places its tip on the trail there.
	{ ideStr : 'high', xcoNum : 1162, ycoNum : 171 }  // What: High Pin Row. Why: The trail's last pin sits north of the east arm. How: This places its tip on the trail there.


];

// #endregion Constants



// #region Components

// #region HerMapCom

/**
 * HerMapCom = Hero Map Component
 *
 * @summary
 * Draws the map. Its drawing space is 1,280 by 520 units, sliced to cover
 * the hero at any shape and held to the hero's right edge, so on a narrow
 * screen the map's right side shows and its left is cut away. The lake, the
 * trail, and the pins sit toward its right side, clear of the hero's text
 * on a wide screen.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props - This component does not use any props.
 *
 * @returns The map's SVG element.
 *
 * @example
 * ```tsx
 * HerMapCom() // => <HerMapCom />
 * ```
 *
*/

function HerMapCom () : React.JSX.Element {


	return (


		<svg
			className={ cssModObj.herMapSvg }

			preserveAspectRatio='xMaxYMid slice'
			viewBox='0 0 1280 520'

			aria-hidden='true'
		>{ /* What: Hero Map SVG Element. Why: The hero sits on a map of the lake. How: This covers the hero with the drawing, sliced to fill it from its right edge, hidden from screen readers as decoration. */ }


			<defs>{ /* What: Map Definitions Element. Why: The lake's shape is drawn several times, as water and as each contour line. How: This holds the shape and the contours' masks for the drawing to reuse. */ }


				<path
					id='mapLakPat'

					d={ LAK_DAT_STR }
					fillRule='evenodd'
				/>{ /* What: Map Lake Path Element. Why: Every copy of the lake draws the same outline. How: This holds the traced shape under an ID, unstyled, for each use to fill or stroke. */ }



				{ CON_REC_ARR.map( ( conRecObj ) => ( // What: Contour Mask Map. Why: Each contour line needs its inside cut away. How: This renders one mask per row of CON_REC_ARR.


					<mask
						key={ conRecObj.ideStr }

						id={ conRecObj.ideStr }

						height='520'
						maskUnits='userSpaceOnUse'
						width='1280'
						x='0'
						y='0'
					>{ /* What: Contour Mask Element. Why: A contour is a thin line, not a filled band. How: This shows everything except the lake and a band around it just narrower than the contour's distance, covering the whole drawing. */ }


						<rect
							className={ cssModObj.conMasRec }

							height='520'
							width='1280'
						/>{ /* What: Contour Mask Rect Element. Why: The mask shows whatever it doesn't cut. How: This fills the drawing in white, which a mask shows. */ }

						<use
							className={ cssModObj.conMasUse }

							href='#mapLakPat'
							strokeWidth={ conRecObj.disNum * 2 - 1.5 } // What: Cut Width. Why: The cut leaves a line 1.5 units wide. How: A stroke straddles the shore, so this is twice the contour's distance, less the line's width.
						/>{ /* What: Contour Mask Use Element. Why: The contour's inside is cut away. How: This fills and strokes the lake's shape in black, which a mask hides. */ }


					</mask>


				))}


			</defs>



			{ CON_REC_ARR.map( ( conRecObj ) => ( // What: Contour Map. Why: Each contour line is drawn once. How: This renders one copy of the lake's shape per row of CON_REC_ARR, masked down to a line.


				<use
					key={ conRecObj.ideStr }

					className={ cssModObj.mapConUse }

					href='#mapLakPat'
					mask={ `url(#${ conRecObj.ideStr })` }
					strokeWidth={ conRecObj.disNum * 2 + 1.5 } // What: Contour Width. Why: The line's outer edge sits just past its distance from the shore. How: A stroke straddles the shore, so this is twice the contour's distance, plus the line's width.
				/> // What: Map Contour Use Element. Why: The contours ring the lake like rising ground. How: This strokes the lake's outline wide in the strong border gray, its mask leaving only the outer line.


			))}



			<use
				className={ cssModObj.mapLakUse }

				href='#mapLakPat'
			/>{ /* What: Map Lake Use Element. Why: The lake is the map's center. How: This fills the lake's shape in a pale lake blue. */ }

			<path
				className={ cssModObj.mapTraPat }

				d={ TRA_DAT_STR }
			/>{ /* What: Map Trail Path Element. Why: A dotted trail ties the pins together, as on a trail map. How: This strokes a dotted coral line along the highway's course, from above the map's top edge to below its bottom edge. */ }



			{ PIN_REC_ARR.map( ( pinRecObj, pinIndNum ) => ( // What: Pin Map. Why: Each place along the trail gets a pin. How: This renders one pin group per row of PIN_REC_ARR, with its place in the drop.


				<g
					key={ pinRecObj.ideStr }

					className={ cssModObj.mapPinGro }

					style={ { '--pin-ind' : pinIndNum } as React.CSSProperties } // What: Pin Index. Why: The pins drop in one after another. How: This hands each group its place, which the stylesheet multiplies into its delay. // What: Type Assertion Note. Why: React's style type doesn't list custom properties. How: The stylesheet reads this one by name.
				>{ /* What: Map Pin Group Element. Why: A pin's body and its dot drop in together. How: This groups them, dropping into place once as the page opens. */ }


					<path
						className={ cssModObj.pinBodPat }

						d={ `M${ pinRecObj.xcoNum } ${ pinRecObj.ycoNum }c0 0-13-14-13-23a13 13 0 0 1 26 0c0 9-13 23-13 23z` } // What: Pin Shape Data. Why: Every pin is the same teardrop, standing on its own spot. How: This starts the shape at the row's tip and draws the teardrop up from it.
					/>{ /* What: Pin Body Path Element. Why: The marker is the pin's teardrop shape. How: This fills it in navy. */ }

					<circle
						className={ cssModObj.pinDotCir }

						cx={ pinRecObj.xcoNum }
						cy={ pinRecObj.ycoNum - 23 } // What: Dot Height. Why: The dot sits at the center of the pin's round head. How: The head's center is 23 units above the tip.
						r='5'
					/>{ /* What: Pin Dot Circle Element. Why: Each pin's head carries a coral dot. How: This draws the dot at the head's center. */ }


				</g>


			))}


		</svg>


	);


}

// #endregion HerMapCom

// #endregion Components



// #region Exports

export { HerMapCom }; // What: Named Export. Why: The home page's hero draws the map behind its words. How: This exports HerMapCom.

// #endregion Exports


