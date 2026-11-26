


// #region Imports

import cssModObj from './about.module.css'; // What: CSS Module Object. Why: The About page is styled in its own module, whose class names Vite hashes. How: Each class an element carries is read from this object.


import { AppShaCom    } from '../../ui/apple-shape.tsx';     // What: Apple Shape Component. Why: The note on the name sits beside the site's apple. How: This draws it in the note's panel.
import { Link         } from 'react-router';                 // What: Link. Why: The page's links to the listing and the Contact page move without a full page load. How: This renders each as a router link.
import { PLA_REC_ARR  } from '../../core/places.ts';         // What: Place Record Array. Why: The page says how many places the guide lists. How: Its length is the places figure.
import { TAG_NAM_ARR  } from '../../core/places.ts';         // What: Tag Name Array. Why: The page says how many kinds of place the guide covers. How: Its length is the kinds figure.
import { TOW_NAM_ARR  } from '../../core/places.ts';         // What: Town Name Array. Why: The page says how many towns the guide covers. How: Its length is the towns figure.
import { usePagDesFun } from '../../ui/page-description.ts'; // What: Use Page Description Function. Why: The About page has its own search description. How: This swaps index.html's description tag while the page shows.

// #endregion Imports



/**
 * about.tsx = About Page
 *
 * @summary
 * The page that says what the guide is: why it gathers every place to eat
 * around the lake into one guide, where its listings come from and how to
 * keep them current, what owners can do, and who builds it. It reads as a
 * column of headed prose under the page's heading, with a sidebar beside it
 * above 960px wide, and below it from there down, holding the guide's
 * figures, a note on its name, and the owners' buttons.
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



/**
 * FAC_REC_ARR = Fact Record Array
 *
 * @summary
 * The figures the sidebar shows, each counted from the listings table as the
 * page's code loads, so a figure changes whenever a place, a town, or a kind
 * is added or removed. Each row is one figure:
 *
 *  - `couNum` (number): the figure itself.
 *
 *  - `labStr` (string): the word under the figure, saying what it counts.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/

const FAC_REC_ARR = [ // What: Fact Record Array. Why: The sidebar sums the guide up in three figures that should never drift from the listings. How: Each row pairs a count read from the listings table with its label.


	{ couNum : PLA_REC_ARR.length, labStr : 'places' }, // What: Places Fact Row. Why: The guide's size is its first figure. How: This counts the rows of the listings table.
	{ couNum : TOW_NAM_ARR.length, labStr : 'towns'  }, // What: Towns Fact Row. Why: The guide covers the whole lake, not one town. How: This counts the towns some place is in.
	{ couNum : TAG_NAM_ARR.length, labStr : 'kinds'  }  // What: Kinds Fact Row. Why: The guide spans many kinds of place. How: This counts the kinds some place carries.


];

// #endregion Constants



// #region Components

// #region AboPagCom

/**
 * AboPagCom = About Page Component
 *
 * @summary
 * Renders the About page: the heading and lead, then the prose sections,
 * each under its own heading, and the sidebar's three panels. The links
 * within the prose route to the listing and the Contact page, the builder
 * link opens techgeek.dev in a new tab that can't reach back to this one,
 * saying so to screen readers, and the owners' buttons open the Contact page
 * with adding or updating chosen.
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



			<div className={ cssModObj.aboLayDiv }>{ /* What: About Layout Div Element. Why: The prose and the sidebar share the page's width. How: This sets the prose beside the sidebar above 960px wide, and above it from there down. */ }


				<div className={ cssModObj.aboBodDiv }>{ /* What: About Body Div Element. Why: The page's prose reads as one column of headed sections. How: This holds the headings and paragraphs, styled together as long-form prose, beside the sidebar above 960px wide. */ }


					<h2>Why one guide</h2>{ /* What: Why Heading Element. Why: The first section explains the guide's idea. How: This names it. */ }

					<p>Finding a place to eat at the lake usually means piecing it together from old directories, social pages, and word of mouth. This guide puts it all in one place, so you can see what's around you, what it serves, and how to reach it, then go eat.</p>{ /* What: Why Paragraph Element. Why: A visitor should know what problem the guide solves. How: This explains it. */ }

					<h2>Where the listings come from</h2>{ /* What: Listings Heading Element. Why: Visitors should know how far to trust a listing. How: This names the section. */ }

					<p>Each listing starts from public information, such as a place's own website or Facebook page and local directories. Hours and menus change, especially with the seasons, so it's always worth calling ahead. If you spot something out of date, or a place I missed, <Link className={ cssModObj.aboBodAnc } to='/contact?reason=tip'>let me know</Link>.</p>{ /* What: Listings Paragraph Element. Why: Visitors should know listings can go stale, and how to help. How: This explains where listings come from and links to the Contact page with a tip chosen. */ }

					<h2>For owners</h2>{ /* What: Owners Heading Element. Why: Owners are the guide's other audience. How: This names their section. */ }

					<p>If you run a place to eat near the lake, you can ask to <Link className={ cssModObj.aboBodAnc } to='/contact?reason=add'>add your place</Link> or <Link className={ cssModObj.aboBodAnc } to='/contact?reason=update'>update your listing</Link> at any time. Each place also has a page of its own, styled like the business, with its menu, its hours, and its story.</p>{ /* What: Owners Paragraph Element. Why: Owners should know how to take part and what a listing includes. How: This links to the Contact page for adding or updating, and mentions each place's own page. */ }

					<h2>Who's behind it</h2>{ /* What: Builder Heading Element. Why: Visitors may want to know who runs the guide. How: This names the section. */ }

					<p>The guide is designed and built by me, Scot, from <a className={ cssModObj.aboBodAnc } href={ BUI_URL_STR } rel='noopener noreferrer' target='_blank'>techgeek.dev<span className={ cssModObj.visHidSpa }> (opens in a new tab)</span></a>. I live here. It's a rural area with no big cities, which means no big-name chains, just a lot of small, family-owned places.</p>{ /* What: Builder Paragraph Element. Why: Visitors should know a neighbor builds the guide, and what eating here is like. How: This names the builder, links to techgeek.dev in a new tab, its hidden note telling screen reader users so, and describes the area. */ }

					<p>Almost none of them have a website, and finding out about them, especially their menus, isn't easy. So I decided to gather them all in one place, each with the details you need and a menu that's easy to read.</p>{ /* What: Reason Paragraph Element. Why: The builder's own reason for the guide makes it personal. How: This says how hard the places are to look up and what the guide does about it. */ }

					<p>I hope it helps them find new customers too, especially the weekend and holiday visitors who don't know the area well yet.</p>{ /* What: Hope Paragraph Element. Why: The guide is meant to help the places as well as their visitors. How: This says so. */ }

					<p>Ready to start? <Link className={ cssModObj.aboBodAnc } to='/places'>Browse every place</Link>.</p>{ /* What: Start Paragraph Element. Why: The prose ends with a way into the guide. How: This links to the listing. */ }


				</div>



				<aside
					className={ cssModObj.aboSidAsi }

					aria-label='The guide at a glance'
				>{ /* What: About Sidebar Aside Element. Why: The figures, the name, and the owners' way in stand apart from the prose. How: This stacks the three panels beside the prose above 960px wide, and below it from there down. */ }


					<section
						className={ cssModObj.facCarSec }

						aria-labelledby='facTitHea'
					>{ /* What: Facts Card Section Element. Why: A few figures sum the guide up at a glance. How: This sets the heading and the figures on a white card, named by its heading. */ }


						<h2
							id='facTitHea'

							className={ cssModObj.sidTitHea }
						>The guide at a glance</h2>{ /* What: Sidebar Title Heading Element. Why: The card names itself. How: This shows it as a small heading in navy, naming the card through its ID. */ }


						<dl className={ cssModObj.facLisDes }>{ /* What: Facts List Description Element. Why: Each figure pairs a number with what it counts. How: This sets the three figures in a row as a description list. */ }


							{ FAC_REC_ARR.map( ( facRecObj ) => ( // What: Fact Map. Why: Each figure gets its own cell. How: This renders one cell per row of FAC_REC_ARR.


								<div
									key={ facRecObj.labStr }

									className={ cssModObj.facIteDiv }
								>{ /* What: Fact Item Div Element. Why: A figure and its label read as one cell. How: This groups them, the number drawn above its label. */ }


									<dt className={ cssModObj.facLabTer }>{ facRecObj.labStr }</dt>{ /* What: Fact Label Term Element. Why: The label says what the figure counts. How: This shows it small and uppercase under the number. */ }

									<dd className={ cssModObj.facNumDet }>{ facRecObj.couNum }</dd>{ /* What: Fact Number Details Element. Why: The figure is the cell's point. How: This shows the count large in navy, drawn above its label. */ }


								</div>


							))}


						</dl>


					</section>



					<section
						className={ cssModObj.namPanSec }

						aria-labelledby='namTitHea'
					>{ /* What: Name Panel Section Element. Why: The name's meaning is the page's bit of charm, and gives the site its apple. How: This sets the apple, the heading, and the note on a pale blue panel, named by its heading. */ }


						<svg
							className={ cssModObj.namAppSvg }

							viewBox='9 -2 44 48'

							aria-hidden='true'
						>{ /* What: Name Apple SVG Element. Why: The apple of the earth deserves its apple. How: This draws the site's apple above the note, tipped a little, hidden from screen readers as decoration. */ }


							<AppShaCom />{ /* What: Apple Shape Component. Why: The apple is drawn the same wherever the site shows it. How: This draws the shared apple, filling the drawing. */ }


						</svg>



						<h2
							id='namTitHea'

							className={ cssModObj.sidTitHea }
						>About the name</h2>{ /* What: Sidebar Title Heading Element. Why: Visitors may wonder what Pomme de Terre means. How: This shows it as a small heading in navy, naming the panel through its ID. */ }

						<p className={ cssModObj.sidTexPar }>Pomme de terre is French for potato, but word for word it means "apple of the earth." The lake takes its name from the Pomme de Terre River, which feeds it. I like the word-for-word version best, and you'll spot a little apple here and there around the site.</p>{ /* What: Sidebar Text Paragraph Element. Why: The name is half the charm, and its literal meaning gives the site its apple. How: This gives the French, its word-for-word meaning, and where the lake's name comes from. */ }


					</section>



					<section
						className={ cssModObj.ownCarSec }

						aria-labelledby='ownTitHea'
					>{ /* What: Owners Card Section Element. Why: The page should end in something an owner can do. How: This sets the heading, a line of text, and the two buttons on a navy panel, named by its heading. */ }


						<h2
							id='ownTitHea'

							className={` ${ cssModObj.sidTitHea }   ${ cssModObj.sidTitHeaInverse } `}
						>Run a place near the lake?</h2>{ /* What: Sidebar Title Heading Inverse Element. Why: The card asks owners directly. How: This shows the question as a small heading in white, naming the card through its ID. */ }

						<p className={` ${ cssModObj.sidTexPar }   ${ cssModObj.sidTexParInverse } `}>Get it into the guide, or send me changes to a listing that's already here.</p>{ /* What: Sidebar Text Paragraph Inverse Element. Why: Owners should know both ways in. How: This names adding a place and updating a listing, in the pale blue. */ }



						<div className={ cssModObj.ownActDiv }>{ /* What: Owners Actions Div Element. Why: Each way in gets its own button. How: This stacks the two buttons, each as wide as the card. */ }


							<Link
								className={` ${ cssModObj.butBasAnc }   ${ cssModObj.butBasAncCoral } `}

								to='/contact?reason=add'
							>Add my place</Link>{ /* What: Button Base Anchor Coral Link. Why: Adding a place is the card's main action. How: This routes to the Contact page with adding a place chosen, set as a coral button with dark text. */ }



							<Link
								className={` ${ cssModObj.butBasAnc }   ${ cssModObj.butBasAncOutline } `}

								to='/contact?reason=update'
							>Update my listing</Link>{ /* What: Button Base Anchor Outline Link. Why: Updating a listing is the card's other action. How: This routes to the Contact page with updating a listing chosen, set as a white outlined button. */ }


						</div>


					</section>


				</aside>


			</div>


		</div>


	);


}

// #endregion AboPagCom

// #endregion Components



// #region Exports

export { AboPagCom }; // What: Named Export. Why: The About route renders this page. How: This exports AboPagCom.

// #endregion Exports


