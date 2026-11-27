


// #region Imports

import cssModObj from './brand-mark.module.css'; // What: CSS Module Object. Why: The mark is sized in its own module, whose class names Vite hashes. How: The SVG's class is read from this object.


import { AppShaCom } from './apple-shape.tsx'; // What: Apple Shape Component. Why: The mark's apple is the site's shared apple. How: This draws it inside the mark's own group, which places, sizes, and tilts it.

// #endregion Imports



/**
 * brand-mark.tsx = Brand Mark
 *
 * @summary
 * The site's mark: a navy disc holding a tilted, bitten apple over a pale
 * blue lake, ringed in the same pale blue, for the name's "apple of the
 * earth", the guide's "eats", and the lake. The favicon in public/ is the
 * same drawing without the ring. It's decoration beside the name, so it's
 * hidden from screen readers.
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
 * em square, so it follows the font size of the text it sits beside. Its
 * colors read the color tokens.
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

			viewBox='0 0 34 34'

			aria-hidden='true'
		>{ /* What: Brand Mark SVG Element. Why: The mark stays sharp at any size. How: This draws the disc, the lake, the apple, and the ring on a 34 unit square, hidden from screen readers as decoration. */ }


			<circle
				className={ cssModObj.marDisCir }

				cx='17'
				cy='17'
				r='16'
			/>{ /* What: Mark Disc Circle Element. Why: The mark sits on a navy disc. How: This fills a circle the size of the square. */ }

			<path
				className={ cssModObj.marWatPat }

				d='M2.6 24c4.8-3 9.6-3 14.4 0s9.6 3 14.4 0A16 16 0 0 1 2.6 24z'
			/>{ /* What: Mark Water Path Element. Why: The lake fills the foot of the disc. How: This fills the disc's lower part in pale blue, under a wave for its surface. */ }



			<g transform='translate( 17 16.5 ) rotate( -12 ) scale( 0.45 ) translate( -31 -22.5 )'>{ /* What: Mark Apple Group Element. Why: The apple sits in front of the lake, tilted, small enough that its leaf clears the disc's edge. How: This centers the apple's own drawing a little above the disc's middle, at under half its size, turned 12 degrees. */ }


				<AppShaCom />{ /* What: Apple Shape Component. Why: The mark's apple is the site's shared apple. How: This draws its bitten body, stem, and leaf. */ }


			</g>



			<circle
				className={ cssModObj.marRinCir }

				cx='17'
				cy='17'
				r='15.5'
			/>{ /* What: Mark Ring Circle Element. Why: A pale ring gives the disc an edge on a dark surface. How: This strokes a 1 unit ring just inside the disc's edge, with no fill. */ }


		</svg>


	);


}

// #endregion BraMarCom

// #endregion Components



// #region Exports

export { BraMarCom }; // What: Named Export. Why: The mark is drawn beside the site's name. How: This exports BraMarCom.

// #endregion Exports


