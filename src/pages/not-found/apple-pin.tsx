


// #region Imports

import cssModObj from './apple-pin.module.css'; // What: CSS Module Object. Why: The drawing is styled in its own module, whose class names Vite hashes. How: Each class an element carries is read from this object.


import { AppShaCom } from '../../ui/apple-shape.tsx'; // What: Apple Shape Component. Why: The apple is drawn the same wherever the site shows it. How: This draws it inside the pin's head.

// #endregion Imports



/**
 * apple-pin.tsx = Apple Pin
 *
 * @summary
 * The 404 page's picture: a navy map pin with a coral apple inside its
 * round head, stem and leaf and all, for the name's "apple of the earth" and the
 * page's "rolled off the map". It's decoration beside a heading that says
 * what happened, so it's hidden from screen readers.
 *
 * Sections:
 *  - Components
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Components

// #region AppPinCom

/**
 * AppPinCom = Apple Pin Component
 *
 * @summary
 * Draws the pin and its apple as one inline SVG on a 60 by 72 unit box, at
 * the size its stylesheet gives it, the apple tipped a little to one side as
 * if it's about to roll.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props - This component does not use any props.
 *
 * @returns The drawing's SVG element.
 *
 * @example
 * ```tsx
 * AppPinCom() // => <AppPinCom />
 * ```
 *
*/

function AppPinCom () : React.JSX.Element {


	return (


		<svg
			className={ cssModObj.appPinSvg }

			viewBox='0 20 60 72'

			aria-hidden='true'
		>{ /* What: Apple Pin SVG Element. Why: The page's picture stays sharp at any size. How: This draws the pin and its apple, hidden from screen readers as decoration. */ }


			<path
				className={ cssModObj.pinBodPat }

				d='M30 90C30 90 6 62 6 46a24 24 0 0 1 48 0c0 16-24 44-24 44z'
			/>{ /* What: Pin Body Path Element. Why: The apple sits on a map pin. How: This fills the teardrop in navy. */ }



			<g transform='translate( 30 46 ) rotate( -12 ) scale( 0.7 ) translate( -31 -24 )'>{ /* What: Apple Group Element. Why: The apple sits inside the pin's round head, tipped a little, as if about to roll off. How: This shrinks the apple to fit the head, turns them, and centers them on the head's center. */ }


				<AppShaCom />{ /* What: Apple Shape Component. Why: The pin's head holds the site's apple. How: This draws the shared apple, stem and leaf and all. */ }


			</g>


		</svg>


	);


}

// #endregion AppPinCom

// #endregion Components



// #region Exports

export { AppPinCom }; // What: Named Export. Why: The 404 page shows the apple pin. How: This exports AppPinCom.

// #endregion Exports


