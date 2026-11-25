


// #region Imports

import cssModObj from './about.module.css'; // What: CSS Module Object. Why: The About page is styled in its own module, whose class names Vite hashes. How: Each class an element carries is read from this object.


import { Link         } from 'react-router';                // What: Link. Why: The page's links to the listing and the Contact page move without a full page load. How: This renders each as a router link.
import { usePagDesFun } from '../../ui/page-description.ts'; // What: Use Page Description Function. Why: The About page has its own search description. How: This swaps index.html's description tag while the page shows.

// #endregion Imports



/**
 * about.tsx = About Page
 *
 * @summary
 * The page that says what the guide is: why it gathers every place to eat
 * around the lake into one guide, where its listings come from and how to
 * keep them current, what's coming for owners, and who builds it. It reads
 * as one column of headed prose under the page's heading.
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

const BUI_URL_STR = 'https://techgeek.dev/'; // What: Builder URL String. Why: The page credits the guide to its builder. How: The builder link opens this address.

// #endregion Constants



// #region Components

// #region AboPagCom

/**
 * AboPagCom = About Page Component
 *
 * @summary
 * Renders the About page: the heading and lead, then the prose sections,
 * each under its own heading. The links within the prose route to the
 * listing and the Contact page, and the builder link opens techgeek.dev in a
 * new tab that can't reach back to this one, saying so to screen readers.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props - This component does not use any props.
 *
 * @returns The page's wrapper div.
 *
 * @example
 * ```tsx
 * AboPagCom() // => <AboPagCom />
 * ```
 *
*/

function AboPagCom () : React.JSX.Element {


	usePagDesFun( 'What Lake Pomme de Terre Eats is, where its listings come from, and how owners can add or update their place in the guide.' ); // What: Page Description Call. Why: Search listings should describe this page, not repeat the home page. How: This swaps the one description tag's text for the page's own while it shows.



	return (


		<div className={ cssModObj.aboPagDiv }>{ /* What: About Page Div Element. Why: The page arrives gently and holds its heading and its prose in order. How: This fades the page in and stacks them in the page's centered column. */ }


			<title>About Lake Pomme de Terre Eats</title>{ /* What: Page Title Element. Why: A visitor's tab, history, and search listings should name the page. How: React places this ahead of index.html's title while the page shows. */ }

			<link
				href='https://pommedeterreeats.com/about'
				rel='canonical'
			/>{ /* What: Page Canonical Link Element. Why: Search engines should index the page at one address. How: React places this in the head while the page shows. */ }

			<div className={ cssModObj.aboHeaDiv }>{ /* What: About Heading Div Element. Why: The page opens by naming itself. How: This stacks the eyebrow, the heading, and the lead. */ }


				<p className={ cssModObj.aboEyePar }>About the guide</p>{ /* What: About Eyebrow Paragraph Element. Why: A short label names the page. How: This shows it small and uppercase in the coral's text shade. */ }

				<h1 className={ cssModObj.aboTitHea }>One guide to every meal around the lake</h1>{ /* What: About Title Heading Element. Why: The page's one heading says what the guide is. How: This shows it large in navy. */ }

				<p className={ cssModObj.aboLeaPar }>Lake Pomme de Terre Eats gathers the places to eat around the lake into one guide: the diners and cafes in the towns, the grills at the marinas, and the pizza, barbecue, and ice cream stops along the highways between them.</p>{ /* What: About Lead Paragraph Element. Why: A sentence says what the guide holds. How: This shows it a step larger than body text, in slate. */ }


			</div>



			<div className={ cssModObj.aboBodDiv }>{ /* What: About Body Div Element. Why: The page's prose reads as one column of headed sections. How: This holds the headings and paragraphs, styled together as long-form prose. */ }


				<h2>Why one guide</h2>{ /* What: Why Heading Element. Why: The first section explains the guide's idea. How: This names it. */ }

				<p>Finding a place to eat at the lake usually means piecing it together from old directories, social pages, and word of mouth. This guide puts it all in one place, so you can see what's around you, what it serves, and how to reach it, then go eat.</p>{ /* What: Why Paragraph Element. Why: A visitor should know what problem the guide solves. How: This explains it. */ }

				<h2>Where the listings come from</h2>{ /* What: Listings Heading Element. Why: Visitors should know how far to trust a listing. How: This names the section. */ }

				<p>Each listing starts from public information, such as a place's own website or Facebook page and local directories. Hours and menus change, especially with the seasons, so it's always worth calling ahead. If you spot something out of date, or a place we missed, <Link className={ cssModObj.aboBodAnc } to='/contact?reason=tip'>let us know</Link>.</p>{ /* What: Listings Paragraph Element. Why: Visitors should know listings can go stale, and how to help. How: This explains where listings come from and links to the Contact page with a tip chosen. */ }

				<h2>For owners</h2>{ /* What: Owners Heading Element. Why: Owners are the guide's other audience. How: This names their section. */ }

				<p>If you run a place to eat near the lake, you can ask to <Link className={ cssModObj.aboBodAnc } to='/contact?reason=add'>add your place</Link> or <Link className={ cssModObj.aboBodAnc } to='/contact?reason=update'>update your listing</Link> at any time. Each place will also get a page of its own, styled like the business, with its menu, its hours, and its story.</p>{ /* What: Owners Paragraph Element. Why: Owners should know how to take part and what's coming. How: This links to the Contact page for adding or updating, and mentions the pages on the way. */ }

				<h2>Who's behind it</h2>{ /* What: Builder Heading Element. Why: Visitors may want to know who runs the guide. How: This names the section. */ }

				<p>The guide is designed and built by <a className={ cssModObj.aboBodAnc } href={ BUI_URL_STR } rel='noopener noreferrer' target='_blank'>techgeek.dev<span className={ cssModObj.visHidSpa }> (opens in a new tab)</span></a>. Ready to start? <Link className={ cssModObj.aboBodAnc } to='/places'>Browse every place</Link>.</p>{ /* What: Builder Paragraph Element. Why: The page credits its builder and ends with a way into the guide. How: This links to techgeek.dev in a new tab, its hidden note telling screen reader users so, and to the listing. */ }


			</div>


		</div>


	);


}

// #endregion AboPagCom

// #endregion Components



// #region Exports

export { AboPagCom }; // What: Named Export. Why: The About route renders this page. How: This exports AboPagCom.

// #endregion Exports


