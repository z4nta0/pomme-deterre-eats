


// #region Imports

import cssModObj from './hero-map.module.css'; // What: CSS Module Object. Why: The map is styled in its own module, whose class names Vite hashes. How: Each class an element carries is read from this object.

// #endregion Imports



/**
 * hero-map.tsx = Hero Map
 *
 * @summary
 * The home page hero's backdrop: a simple trail map of the lake country,
 * drawn as one inline SVG covering the hero, with a soft lake, contour lines
 * around it, and a dotted coral trail running between three navy pins, which
 * drop into place one after another as the page opens. It's decoration
 * behind the hero's words, so it's hidden from screen readers and takes no
 * pointer events.
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

const PIN_REC_ARR = [ // What: Pin Record Array. Why: The pins sit along the trail, dropping in from the lowest up. How: Each row names a pin and the drawing-space spot its tip stands on.


	{ ideStr : 'low',  xcoNum : 890,  ycoNum : 330 }, // What: Low Pin Row. Why: The trail's first pin sits beside the lake's lower shore. How: This places its tip there.
	{ ideStr : 'mid',  xcoNum : 1090, ycoNum : 180 }, // What: Middle Pin Row. Why: The trail's second pin sits past the lake. How: This places its tip there.
	{ ideStr : 'high', xcoNum : 1210, ycoNum : 80  }  // What: High Pin Row. Why: The trail's last pin sits near the map's top. How: This places its tip there.


];

// #endregion Constants



// #region Components

// #region HerMapCom

/**
 * HerMapCom = Hero Map Component
 *
 * @summary
 * Draws the map. Its drawing space is 1,280 by 520 units, sliced to cover
 * the hero at any shape, so on a narrow screen the middle of the map shows
 * and its ends are cut away. The lake and the pins sit toward its right
 * side, clear of the hero's text on a wide screen.
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

			preserveAspectRatio='xMidYMid slice'
			viewBox='0 0 1280 520'

			aria-hidden='true'
		>{ /* What: Hero Map SVG Element. Why: The hero sits on a map of the lake country. How: This covers the hero with the drawing, sliced to fill it, hidden from screen readers as decoration. */ }


			<path
				className={ cssModObj.mapLakPat }

				d='M840 150c70-50 170-40 220 20s30 120 90 150 40 110-40 120-150-40-210-20-140-10-150-70 20-150 90-200z'
			/>{ /* What: Map Lake Path Element. Why: The lake is the map's center. How: This fills a soft, irregular lake shape in a pale lake blue. */ }



			<g className={ cssModObj.mapConGro }>{ /* What: Map Contours Group Element. Why: Contour lines read as a map at a glance. How: This strokes every line in the group in the strong border gray, with no fill. */ }


				<path d='M790 110c90-60 230-50 300 30s60 160 120 190 30 150-80 160-200-40-280-20-190-20-200-100 40-200 140-260z' />{ /* What: Map Contour Path Element. Why: The contours ring the lake like rising ground. How: This is the line nearest the lake. */ }

				<path d='M740 70c110-70 290-60 380 40s80 190 140 230 20 190-120 200-250-50-350-30-240-30-250-130 60-250 200-310z' />{ /* What: Map Contour Path Element. Why: The contours ring the lake like rising ground. How: This is the middle line. */ }

				<path d='M690 30c130-80 350-70 460 50s100 220 160 270 10 230-160 240-300-60-420-40-290-40-300-160 80-300 260-360z' />{ /* What: Map Contour Path Element. Why: The contours ring the lake like rising ground. How: This is the outermost line. */ }

				<path d='M-40 440c160-60 320-40 460 20s300 60 420 10' />{ /* What: Map Contour Path Element. Why: Low hills run along the map's lower left. How: This is the upper of the two lines there. */ }

				<path d='M-40 490c160-60 320-40 460 20s300 60 420 10' />{ /* What: Map Contour Path Element. Why: Low hills run along the map's lower left. How: This is the lower of the two lines there. */ }


			</g>



			<path
				className={ cssModObj.mapTraPat }

				d='M640 470c90-70 170-110 250-140s140-60 200-150 90-100 120-100'
			/>{ /* What: Map Trail Path Element. Why: A dotted trail ties the pins together, as on a trail map. How: This strokes a dotted coral line from the lower middle up past the lake. */ }



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


