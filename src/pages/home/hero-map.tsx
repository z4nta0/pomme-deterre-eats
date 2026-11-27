


// #region Imports

import cssModObj from './hero-map.module.css'; // What: CSS Module Object. Why: The map is styled in its own module, whose class names Vite hashes. How: Each class an element carries is read from this object.

// #endregion Imports



/**
 * hero-map.tsx = Hero Map
 *
 * @summary
 * The home page hero's backdrop: a simple map of Lake Pomme de Terre, drawn
 * as one inline SVG covering the hero, with the lake's general shape in pale
 * blue, contour lines ringing its shore, and a dotted coral trail following
 * Highway 64 across the map between three navy pins, which drop into place
 * one after another as the page opens. The lake is a simplified sketch, its
 * arms and a few coves drawn as thick rounded lines, turned a little so it
 * stands upright. It's decoration behind the hero's words, so it's hidden
 * from screen readers and takes no pointer events.
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

const LAK_WID_NUM = 30; // What: Lake Width Number. Why: The lake's arms are drawn as lines of one width. How: This is that width in drawing units.



const TRA_DAT_STR = 'M1157 -50C1158 -30 1160 45 1165 72C1170 99 1180 99 1186 112C1192 124 1192 134 1202 145C1212 157 1243 169 1245 181C1247 194 1224 214 1213 221C1203 227 1194 219 1182 220C1170 220 1153 224 1141 225C1130 227 1119 220 1112 228C1105 235 1102 256 1098 269C1094 283 1093 295 1089 307C1084 320 1077 333 1073 344C1068 355 1064 362 1061 376C1058 390 1058 407 1055 426C1052 445 1050 463 1045 490C1039 516 1025 569 1021 585'; // What: Trail Data String. Why: The trail follows Highway 64, which crosses the lake's east arm, and runs off the map at both ends. How: This is its path, starting above the drawing's top edge and ending below its bottom edge.



/**
 * CON_REC_ARR = Contour Record Array
 *
 * @summary
 * The contour lines around the lake, nearest first. Each is the lake's own
 * shape drawn wider and then cut away inside, leaving a thin line that
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


	{ disNum : 13, ideStr : 'conOneMas' }, // What: First Contour Row. Why: The nearest line hugs the shore. How: This sets it 13 units out.
	{ disNum : 31, ideStr : 'conTwoMas' }, // What: Second Contour Row. Why: The lines spread as they leave the shore. How: This sets it 31 units out.
	{ disNum : 52, ideStr : 'conThrMas' }  // What: Third Contour Row. Why: The outermost line ends the rings. How: This sets it 52 units out.


];



// #region LAK_REC_ARR

/**
 * LAK_REC_ARR = Lake Record Array
 *
 * @summary
 * The lines that make up the lake, sketched from its general shape: the
 * basin behind the dam, the two arms, and a few coves. Drawn thick with
 * round ends, they merge into one body of water. Each row is one line:
 *
 *  - `datStr` (string): the line's path data, in the map's drawing space.
 *
 *  - `ideStr` (string): the line's name, which keys its element.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/

const LAK_REC_ARR = [ // What: Lake Record Array. Why: The lake is drawn from a handful of thick lines. How: Each row names a line and gives its path.


	{ // What: Dam Path Row. Why: The lake is widest behind its dam, at the map's top. How: This runs from the dam down into the basin.


		ideStr : 'dam',

		datStr : 'M1122 45C1118 49 1105 61 1097 69C1089 76 1085 86 1075 90C1066 94 1046 93 1040 94'


	},

	{ // What: Basin Middle Path Row. Why: The basin is wider than one line can draw. How: This runs a second line through the basin's middle.


		ideStr : 'basinMiddle',

		datStr : 'M1127 75C1121 77 1103 85 1090 87C1077 90 1054 89 1047 89'


	},

	{ // What: Basin South Path Row. Why: The basin is wider than one line can draw. How: This runs a third line along the basin's south shore.


		ideStr : 'basinSouth',

		datStr : 'M1134 111C1127 111 1107 114 1093 114C1079 113 1063 110 1049 107C1034 104 1013 97 1005 95'


	},

	{ // What: West Arm Path Row. Why: The lake's long west arm runs south from the basin. How: This runs from the basin west and then down the map.


		ideStr : 'westArm',

		datStr : 'M1040 94C1031 95 1006 97 987 100C969 102 945 106 928 107C912 109 895 103 888 110C880 117 880 136 882 149C884 162 896 176 900 187C904 198 910 206 908 217C906 228 891 240 889 253C887 266 895 281 897 295C899 309 905 329 899 339C894 348 877 347 865 351C853 356 840 358 828 366C815 374 803 388 792 399C781 410 768 422 759 432C750 442 742 455 739 459'


	},

	{ // What: East Arm Path Row. Why: The lake's east arm runs east from the basin. How: This runs from the basin east, turning south and east again.


		ideStr : 'eastArm',

		datStr : 'M1075 90C1076 97 1076 120 1081 131C1086 142 1096 153 1107 157C1118 160 1134 154 1147 154C1161 154 1181 150 1190 157C1198 164 1202 181 1199 193C1196 206 1172 223 1173 234C1174 245 1194 254 1205 261C1216 267 1232 269 1237 270'


	},

	{ // What: East Arm South Path Row. Why: The east arm forks south near its end. How: This runs the south fork down from the east arm.


		ideStr : 'eastArmSouth',

		datStr : 'M1173 234C1170 240 1155 257 1154 270C1154 282 1166 297 1172 308C1178 319 1191 326 1189 334C1187 343 1164 353 1159 357'


	},

	{ // What: Wheatland Cove Path Row. Why: A cove opens off the west arm's top. How: This runs a short line west from the arm.


		ideStr : 'wheatlandCove',

		datStr : 'M928 107C925 104 919 89 910 86C901 83 881 87 875 87'


	},

	{ // What: West Cove Path Row. Why: A cove opens off the west arm's middle. How: This runs a short line east from the arm.


		ideStr : 'westCove',

		datStr : 'M908 217C913 216 932 212 941 207C951 203 959 192 963 189'


	},

	{ // What: Park Cove Path Row. Why: A cove cuts into the land between the arms. How: This runs a short line south from the east arm.


		ideStr : 'parkCove',

		datStr : 'M1081 131C1078 137 1067 155 1065 165C1063 175 1070 185 1071 189'


	},

	{ // What: East Cove Path Row. Why: A cove opens off the east arm's north shore. How: This runs a short line north from the arm.


		ideStr : 'eastCove',

		datStr : 'M1147 154C1147 149 1144 134 1145 127C1145 121 1152 116 1153 114'


	},

	{ // What: South Cove Path Row. Why: A cove opens off the west arm's lower reach. How: This runs a short line east from the arm.


		ideStr : 'southCove',

		datStr : 'M828 366C831 370 843 384 846 387'


	}


];

// #endregion LAK_REC_ARR



const PIN_REC_ARR = [ // What: Pin Record Array. Why: The pins sit along the trail, dropping in from the lowest up. How: Each row names a pin and the drawing-space spot its tip stands on.


	{ ideStr : 'low',  xcoNum : 1056, ycoNum : 415 }, // What: Low Pin Row. Why: The trail's first pin sits south of the lake. How: This places its tip there.
	{ ideStr : 'mid',  xcoNum : 1107, ycoNum : 243 }, // What: Middle Pin Row. Why: The trail's second pin sits on the land between the lake's arms. How: This places its tip there.
	{ ideStr : 'high', xcoNum : 1186, ycoNum : 112 }  // What: High Pin Row. Why: The trail's last pin sits past the east arm, near the map's top. How: This places its tip there.


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
 * trail, and the pins sit toward its right side, clear of most of the
 * hero's text on a wide screen.
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


				<g
					id='mapLakGro'

					className={ cssModObj.mapLakGro }
				>{ /* What: Map Lake Group Element. Why: Every copy of the lake draws the same lines. How: This groups them under an ID, unfilled and round at their ends and joins, for each use to stroke at its own width. */ }


					{ LAK_REC_ARR.map( ( lakRecObj ) => ( // What: Lake Map. Why: Each line of the lake gets a path. How: This renders one path per row of LAK_REC_ARR.


						<path
							key={ lakRecObj.ideStr }

							d={ lakRecObj.datStr }
						/> // What: Lake Line Path Element. Why: The lake is the sum of its lines. How: This draws the row's line.


					))}


				</g>



				{ CON_REC_ARR.map( ( conRecObj ) => ( // What: Contour Mask Map. Why: Each contour line needs its inside cut away. How: This renders one mask per row of CON_REC_ARR.


					<mask
						key={ conRecObj.ideStr }

						id={ conRecObj.ideStr }

						height='520'
						maskUnits='userSpaceOnUse'
						width='1280'
						x='0'
						y='0'
					>{ /* What: Contour Mask Element. Why: A contour is a thin line, not a filled band. How: This shows everything except the lake's shape drawn just narrower than the contour, covering the whole drawing. */ }


						<rect
							className={ cssModObj.conMasRec }

							height='520'
							width='1280'
						/>{ /* What: Contour Mask Rect Element. Why: The mask shows whatever it doesn't cut. How: This fills the drawing in white, which a mask shows. */ }

						<use
							className={ cssModObj.conMasUse }

							href='#mapLakGro'
							strokeWidth={ LAK_WID_NUM + conRecObj.disNum * 2 - 1.5 } // What: Cut Width. Why: The cut leaves a line 1.5 units wide. How: This is the lake's width plus the contour's distance on both sides, less half the line's width on each side.
						/>{ /* What: Contour Mask Use Element. Why: The contour's inside is cut away. How: This draws the lake's shape in black, which a mask hides. */ }


					</mask>


				))}


			</defs>



			{ CON_REC_ARR.map( ( conRecObj ) => ( // What: Contour Map. Why: Each contour line is drawn once. How: This renders one copy of the lake's shape per row of CON_REC_ARR, masked down to a line.


				<use
					key={ conRecObj.ideStr }

					className={ cssModObj.mapConUse }

					href='#mapLakGro'
					mask={ `url(#${ conRecObj.ideStr })` }
					strokeWidth={ LAK_WID_NUM + conRecObj.disNum * 2 + 1.5 } // What: Contour Width. Why: The line's outer edge sits just past its distance from the shore. How: This is the lake's width plus the contour's distance on both sides, plus half the line's width on each side.
				/> // What: Map Contour Use Element. Why: The contours ring the lake like rising ground. How: This strokes the lake's shape wide in the strong border gray, its mask leaving only the outer line.


			))}



			<use
				className={ cssModObj.mapLakUse }

				href='#mapLakGro'
				strokeWidth={ LAK_WID_NUM }
			/>{ /* What: Map Lake Use Element. Why: The lake is the map's center. How: This strokes the lake's shape in a pale lake blue, its lines merging into one body of water. */ }

			<path
				className={ cssModObj.mapTraPat }

				d={ TRA_DAT_STR }
			/>{ /* What: Map Trail Path Element. Why: A dotted trail ties the pins together, as on a trail map. How: This strokes a dotted coral line along the highway's course, from the map's top edge to its bottom edge. */ }



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


