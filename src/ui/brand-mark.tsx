


// #region Imports

import cssModObj from './brand-mark.module.css'; // What: CSS Module Object. Why: The mark is sized in its own module, whose class names Vite hashes. How: The SVG's class is read from this object.

// #endregion Imports



/**
 * brand-mark.tsx = Brand Mark
 *
 * @summary
 * The site's mark: a navy disc holding two wave lines, a white one above a
 * coral one, the lake at sunset. The bar and the footer draw it beside the
 * name, and the favicon in public/ is the same drawing. It's decoration
 * beside the name, so it's hidden from screen readers.
 *
 * Sections:
 *  - Components
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Components

// #region BraMarCom

/**
 * BraMarCom = Brand Mark Component
 *
 * @summary
 * Draws the mark as an inline SVG at the size its stylesheet gives it, an
 * em square, so it follows the font size of the text it sits beside. The
 * disc reads the accent color and the lower wave the secondary accent, so
 * the mark follows the color tokens.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props - This component does not use any props.
 *
 * @returns The mark's SVG element.
 *
 * @example
 * ```tsx
 * BraMarCom() // => <BraMarCom />
 * ```
 *
*/

function BraMarCom () : React.JSX.Element {


	return (


		<svg
			className={ cssModObj.braMarSvg }

			fill='none'
			viewBox='0 0 34 34'

			aria-hidden='true'
		>{ /* What: Brand Mark SVG Element. Why: The mark stays sharp at any size. How: This draws the disc and its two waves on a 34 unit square, hidden from screen readers as decoration. */ }


			<circle
				className={ cssModObj.marDisCir }

				cx='17'
				cy='17'
				r='16'
			/>{ /* What: Mark Disc Circle Element. Why: The mark sits on a navy disc. How: This fills a circle the size of the square. */ }

			<path
				className={ cssModObj.marUppPat }

				d='M7 14c3-3 6-3 10 0s7 3 10 0'
				strokeLinecap='round'
				strokeWidth='2.5'
			/>{ /* What: Mark Upper Path Element. Why: The upper wave is the lake's surface. How: This strokes a white wave across the disc. */ }

			<path
				className={ cssModObj.marLowPat }

				d='M7 20c3-3 6-3 10 0s7 3 10 0'
				strokeLinecap='round'
				strokeWidth='2.5'
			/>{ /* What: Mark Lower Path Element. Why: The lower wave is the sunset on the water. How: This strokes a coral wave below the white one. */ }


		</svg>


	);


}

// #endregion BraMarCom

// #endregion Components



// #region Exports

export { BraMarCom }; // What: Named Export. Why: The bar and the footer draw the mark beside the name. How: This exports BraMarCom.

// #endregion Exports


