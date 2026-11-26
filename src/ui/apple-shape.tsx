


// #region Imports

import cssModObj from './apple-shape.module.css'; // What: CSS Module Object. Why: The apple is styled in its own module, whose class names Vite hashes. How: Each class an element carries is read from this object.

// #endregion Imports



/**
 * apple-shape.tsx = Apple Shape
 *
 * @summary
 * The site's apple, for the name's "apple of the earth": a coral apple with
 * a stem and a green leaf, drawn as an SVG group for another drawing to
 * place, size, and turn. It holds no SVG element of its own, so whatever
 * draws it decides its box and hides it from screen readers.
 *
 * Sections:
 *  - Components
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Components

// #region AppShaCom

/**
 * AppShaCom = Apple Shape Component
 *
 * @summary
 * Draws the apple's body, stem, and leaf as one group. The shape spans about
 * 11 to 51 units across and 0 to 44 units down in its own drawing space, and
 * its stem takes its color from the --app-ste-col property a parent may set,
 * the deep navy otherwise.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props - This component does not use any props.
 *
 * @returns The apple's SVG group element.
 *
 * @example
 * ```tsx
 * AppShaCom() // => <AppShaCom />
 * ```
 *
*/

function AppShaCom () : React.JSX.Element {


	return (


		<g>{ /* What: Apple Group Element. Why: The apple's parts move as one. How: This groups the body, the stem, and the leaf for the drawing around it to place. */ }


			<path
				className={ cssModObj.appBodPat }

				d='M30 16c-5-5-18-5-19 8s7 22 14 20c2 0 3-1 5-1s3 1 5 1c7 2 15-7 14-20s-14-13-19-8z'
			/>{ /* What: Apple Body Path Element. Why: The apple is the drawing's bright touch. How: This fills the apple shape in coral. */ }

			<path
				className={ cssModObj.appStePat }

				d='M30 16c0-5 2-8 5-11'
			/>{ /* What: Apple Stem Path Element. Why: An apple needs its stem. How: This strokes a short curve up from the apple's top. */ }

			<path
				className={ cssModObj.appLeaPat }

				d='M35 7c3-7 11-9 16-7-2 7-9 10-16 7z'
			/>{ /* What: Apple Leaf Path Element. Why: A leaf finishes the apple. How: This fills a leaf beside the stem in the leaf green. */ }


		</g>


	);


}

// #endregion AppShaCom

// #endregion Components



// #region Exports

export { AppShaCom }; // What: Named Export. Why: The 404 page's pin and the About page's note on the name both draw the apple. How: This exports AppShaCom.

// #endregion Exports


