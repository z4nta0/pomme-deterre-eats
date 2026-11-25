


// #region Imports

import cssModObj from './not-found.module.css'; // What: CSS Module Object. Why: The 404 page is styled in its own module, whose class names Vite hashes. How: Each class an element carries is read from this object.


import { AppPinCom } from './apple-pin.tsx'; // What: Apple Pin Component. Why: The page's picture is an apple on a map pin, for an apple that rolled off the map. How: This draws it.
import { Link      } from 'react-router';   // What: Link. Why: The page's buttons move to other pages without a full page load. How: This renders each one as a router link.

// #endregion Imports



/**
 * not-found.tsx = Not Found Page
 *
 * @summary
 * The page every unknown address shows, kept out of search: an apple tipping
 * off a map pin, for the name's "apple of the earth", a short message that
 * the page isn't here, and two ways onward, back home and on to the listing. It keeps index.html's description, since
 * search engines never show it.
 *
 * Sections:
 *  - Components
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Components

// #region NotFouCom

/**
 * NotFouCom = Not Found Component
 *
 * @summary
 * Renders the 404 page, centered in the space between the bar and the
 * footer, with its own title and a noindex robots tag, so the host's 200
 * answer for an unknown path never puts it in search.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props - This component does not use any props.
 *
 * @returns The page's wrapper div.
 *
 * @example
 * ```tsx
 * NotFouCom() // => <NotFouCom />
 * ```
 *
*/

function NotFouCom () : React.JSX.Element {


	return (


		<div className={ cssModObj.notPagDiv }>{ /* What: Not Found Page Div Element. Why: The page arrives gently and centers its message in the space between the bar and the footer. How: This fades the page in and centers its pin, heading, text, and buttons. */ }


			<title>Page Not Found | Lake Pomme de Terre Eats</title>{ /* What: Page Title Element. Why: The tab should say the page wasn't found. How: React places this ahead of index.html's title while the page shows. */ }

			<meta
				content='noindex'
				name='robots'
			/>{ /* What: Robots Meta Element. Why: The host answers every unknown path with a 200, and those addresses shouldn't be indexed. How: React places this in the head while the page shows. */ }



			<AppPinCom />{ /* What: Apple Pin Component. Why: The page's picture plays on the name's "apple of the earth". How: This draws an apple tipping off a map pin. */ }



			<h1 className={ cssModObj.notTitHea }>This apple rolled off the map</h1>{ /* What: Not Found Title Heading Element. Why: The page's one heading says what happened, with a little of the site's fun and a nod to the name's "apple of the earth". How: This shows it large in navy. */ }

			<p className={ cssModObj.notTexPar }>The page you're looking for isn't here. The address may be mistyped, or the page may have moved, but every place in the guide is still on the map.</p>{ /* What: Not Found Text Paragraph Element. Why: A visitor should know what went wrong and that the guide is fine. How: This says so in slate. */ }



			<div className={ cssModObj.notActDiv }>{ /* What: Not Found Actions Div Element. Why: Each way onward gets its own button. How: This sets the two buttons in a row, wrapping onto two lines where they don't fit. */ }


				<Link
					className={` ${ cssModObj.butBasAnc }   ${ cssModObj.butBasAncSolid } `}

					to='/'
				>Back to home</Link>{ /* What: Button Base Anchor Solid Link. Why: Home is the surest way back into the site. How: This routes to the root path, set as a filled navy button. */ }



				<Link
					className={` ${ cssModObj.butBasAnc }   ${ cssModObj.butBasAncOutline } `}

					to='/places'
				>Browse every place</Link>{ /* What: Button Base Anchor Outline Link. Why: A visitor may have been looking for a place. How: This routes to the listing, set as an outlined navy button. */ }


			</div>


		</div>


	);


}

// #endregion NotFouCom

// #endregion Components



// #region Exports

export { NotFouCom }; // What: Named Export. Why: The catch-all route renders this page. How: This exports NotFouCom.

// #endregion Exports


