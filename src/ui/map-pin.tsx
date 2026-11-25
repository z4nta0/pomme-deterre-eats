


// #region Imports

import cssModObj from './map-pin.module.css'; // What: CSS Module Object. Why: The pin is styled in its own module, whose class names Vite hashes. How: Each class an element carries is read from this object.

// #endregion Imports



/**
 * map-pin.tsx = Map Pin
 *
 * @summary
 * The site's map pin, a navy marker drawn as an inline SVG: small with a
 * coral dot beside a place's town, or large with a step number in place of
 * the dot for the home page's how it works steps. It's decoration beside
 * text that already says what it marks, so it's hidden from screen readers.
 *
 * Sections:
 *  - Components
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Components

type MpcProTyp = { numStr? : string, sizStr : 'large' | 'small' }; // What: Map-Pin-Component Props Type. Why: A pin is drawn at one of two sizes, and only a large one carries a number. How: This types the step number, which replaces the dot when given, and the size.

// #region MapPinCom

/**
 * MapPinCom = Map Pin Component
 *
 * @summary
 * Draws the pin's marker shape with either a coral dot or a step number at
 * its head. Its size comes from its stylesheet's two classes, each a height
 * with the width following the marker's shape.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props.numStr - Number String: The step number to show at the pin's
 *                       head, or nothing for the coral dot.
 * @param props.sizStr - Size String: `large` for a how it works step, `small`
 *                       beside a town.
 *
 * @returns The pin's SVG element.
 *
 * @example
 * ```tsx
 * MapPinCom({ numStr: '1', sizStr: 'large' }) // => <MapPinCom />
 * ```
 *
*/

function MapPinCom ( { numStr, sizStr } : MpcProTyp ) : React.JSX.Element {


	return (


		<svg
			className={` ${ cssModObj.mapPinSvg }   ${ sizStr === 'large' ? cssModObj.mapPinSvgLarge : cssModObj.mapPinSvgSmall } `}

			viewBox='0 0 30 38'

			aria-hidden='true'
		>{ /* What: Map Pin SVG Element. Why: The pin stays sharp at any size. How: This draws the marker on a 30 by 38 unit box, at the large or small size its props name, hidden from screen readers as decoration. */ }


			<path
				className={ cssModObj.pinBodPat }

				d='M15 37C15 37 2 23 2 14a13 13 0 0 1 26 0c0 9-13 23-13 23z'
			/>{ /* What: Pin Body Path Element. Why: The marker is the pin's teardrop shape. How: This fills it in navy. */ }



			{ numStr === undefined ? ( // What: Pin Head Choice. Why: A numbered step shows its number where a plain pin shows its dot. How: This draws the coral dot without a number, and the number in white otherwise.


				<circle
					className={ cssModObj.pinDotCir }

					cx='15'
					cy='14'
					r='5.5'
				/> // What: Pin Dot Circle Element. Why: A plain pin marks its spot with a coral dot. How: This draws the dot at the marker's head.


			) : (


				<text
					className={ cssModObj.pinNumTex }

					fontSize='12' // What: Pin Number Size. Why: The number sits in the SVG's own drawing space, which scales with the pin. How: This sizes it in the 30 by 38 unit box, about half the marker's head.
					textAnchor='middle'
					x='15'
					y='18.5'
				>{ numStr }</text> // What: Pin Number Text Element. Why: A step's pin carries its number. How: This centers the number at the marker's head.


			) }


		</svg>


	);


}

// #endregion MapPinCom

// #endregion Components



// #region Exports

export { MapPinCom }; // What: Named Export. Why: The home page's steps and the place cards draw pins. How: This exports MapPinCom.

// #endregion Exports


