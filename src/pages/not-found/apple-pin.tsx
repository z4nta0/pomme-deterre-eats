


// #region Imports

import cssModObj from './apple-pin.module.css'; // What: CSS Module Object. Why: The drawing is styled in its own module, whose class names Vite hashes. How: Each class an element carries is read from this object.

// #endregion Imports



/**
 * apple-pin.tsx = Apple Pin
 *
 * @summary
 * The 404 page's picture: a navy map pin with a coral apple sitting on its
 * head, stem and leaf and all, for the name's "apple of the earth" and the
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
 * Draws the pin and its apple as one inline SVG on a 60 by 92 unit box, at
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

			viewBox='0 0 60 92'

			aria-hidden='true'
		>{ /* What: Apple Pin SVG Element. Why: The page's picture stays sharp at any size. How: This draws the pin and its apple, hidden from screen readers as decoration. */ }


			<path
				className={ cssModObj.pinBodPat }

				d='M30 90C30 90 6 62 6 46a24 24 0 0 1 48 0c0 16-24 44-24 44z'
			/>{ /* What: Pin Body Path Element. Why: The apple sits on a map pin. How: This fills the teardrop in navy. */ }



			<g transform='rotate( -12 30 26 )'>{ /* What: Apple Group Element. Why: The apple tips a little, as if about to roll off. How: This turns the apple, its stem, and its leaf together around its center. */ }


				<path
					className={ cssModObj.appBodPat }

					d='M30 16c-5-5-18-5-19 8s7 22 14 20c2 0 3-1 5-1s3 1 5 1c7 2 15-7 14-20s-14-13-19-8z'
				/>{ /* What: Apple Body Path Element. Why: The apple is the page's bright touch. How: This fills the apple shape in coral. */ }

				<path
					className={ cssModObj.appStePat }

					d='M30 16c0-5 2-8 5-11'
				/>{ /* What: Apple Stem Path Element. Why: An apple needs its stem. How: This strokes a short curve up from the apple's top. */ }

				<path
					className={ cssModObj.appLeaPat }

					d='M35 7c3-7 11-9 16-7-2 7-9 10-16 7z'
				/>{ /* What: Apple Leaf Path Element. Why: A leaf finishes the apple. How: This fills a leaf beside the stem in the leaf green. */ }


			</g>


		</svg>


	);


}

// #endregion AppPinCom

// #endregion Components



// #region Exports

export { AppPinCom }; // What: Named Export. Why: The 404 page shows the apple pin. How: This exports AppPinCom.

// #endregion Exports


