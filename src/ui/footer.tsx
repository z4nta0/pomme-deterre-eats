


// #region Imports

import cssModObj from './footer.module.css'; // What: CSS Module Object. Why: The footer is styled in its own module, whose class names Vite hashes. How: Each class an element carries is read from this object.


import { BraMarCom   } from './brand-mark.tsx';   // What: Brand Mark Component. Why: The footer's brand opens with the site's mark. How: This draws it beside the name.
import { Link        } from 'react-router';       // What: Link. Why: The footer's links move between routes without a full page load. How: This renders each one as a router link.
import { TOW_NAM_ARR } from '../core/places.ts'; // What: Town Name Array. Why: The footer links to the listing for each town with places in the guide. How: This lists the towns.

// #endregion Imports



/**
 * footer.tsx = Site Footer
 *
 * @summary
 * The footer every page ends with, on the deep navy, rising from the page in
 * a layered wave. It holds the brand, a line on what the guide is, and a
 * note on the name; two columns of links (the guide's pages, and the ways in
 * for owners) beside a small trail map whose last pin carries a little
 * apple, for the name's "apple of the earth"; a row of links to each town's
 * places; and a closing row with the copyright and a note that the site is
 * a project by techgeek.dev. The brand and the link columns sit side by side
 * above 640px wide and stack at 640px and below, where the closing row
 * stacks too. Its colors come from the color tokens, so an eating place's
 * own page can restyle it by setting its own.
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

const BUI_URL_STR = 'https://techgeek.dev/'; // What: Builder URL String. Why: The closing row credits the site to its builder. How: The project note's link opens this address.

const FOO_COL_ARR = [ // What: Footer Column Array. Why: The footer's links fall into two groups, each under its own heading. How: Each row names a column's heading and lists its links.


	{ // What: Explore Column Row. Why: Visitors reach the guide's pages from the footer too. How: This lists the home, listing, and About pages.


		heaStr : 'Explore',

		linArr : [ // What: Link Array. Why: The column lists its pages in a set order. How: Each row names a path and a label.


			{ labStr : 'Home',        patStr : '/'       }, // What: Home Link Row. Why: The home page is where a visitor starts. How: This links to the root path.
			{ labStr : 'Every place', patStr : '/places' }, // What: Places Link Row. Why: The listing is the guide itself. How: This links to the Places page.
			{ labStr : 'About',       patStr : '/about'  }  // What: About Link Row. Why: Visitors may want to know who runs the guide. How: This links to the About page.


		]


	},

	{ // What: Owners Column Row. Why: Owners are the guide's other audience. How: This lists the ways to add or change a place, and the Contact page.


		heaStr : 'For owners',

		linArr : [ // What: Link Array. Why: The column lists its links in a set order. How: Each row names a path and a label.


			{ labStr : 'Add your place',      patStr : '/contact?reason=add'    }, // What: Add Link Row. Why: An owner whose place isn't listed should find the way in. How: This links to the Contact page with adding a place chosen.
			{ labStr : 'Update your listing', patStr : '/contact?reason=update' }, // What: Update Link Row. Why: An owner whose place is listed may have changes. How: This links to the Contact page with updating a listing chosen.
			{ labStr : 'Contact',             patStr : '/contact'               }  // What: Contact Link Row. Why: Anyone may have a question for the guide. How: This links to the Contact page.


		]


	}


];

// #endregion Constants



// #region Components

// #region FooWavCom

/**
 * FooWavCom = Footer Wave Component
 *
 * @summary
 * Draws the footer's top edge as two layered waves rising from the page, a
 * lighter navy wave behind the footer's own deep navy, as one inline SVG
 * stretched across the footer's width just above it. It's decoration, so
 * it's hidden from screen readers.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props - This component does not use any props.
 *
 * @returns The wave's SVG element.
 *
 * @example
 * ```tsx
 * FooWavCom() // => <FooWavCom />
 * ```
 *
*/

function FooWavCom () : React.JSX.Element {


	return (


		<svg
			className={ cssModObj.fooWavSvg }

			preserveAspectRatio='none'
			viewBox='0 0 1440 48'

			aria-hidden='true'
		>{ /* What: Footer Wave SVG Element. Why: The footer rises from the page like the lake's edge. How: This stretches the two waves across the footer's width, hidden from screen readers as decoration. */ }


			<path
				className={ cssModObj.wavBacPat }

				d='M0 22C240 0 480 0 720 22S1200 46 1440 18V48H0z'
			/>{ /* What: Wave Back Path Element. Why: A lighter wave behind gives the edge depth. How: This fills the taller wave in the raised navy. */ }

			<path
				className={ cssModObj.wavFroPat }

				d='M0 34C300 14 560 14 820 32S1240 48 1440 30V48H0z'
			/>{ /* What: Wave Front Path Element. Why: The front wave meets the footer's own color. How: This fills the lower wave in the footer's deep navy. */ }


		</svg>


	);


}

// #endregion FooWavCom



// #region FooMapCom

/**
 * FooMapCom = Footer Map Component
 *
 * @summary
 * Draws the small trail map beside the footer's link columns: a few contour
 * lines and a dotted coral trail ending at a pin whose head is a little
 * apple with a leaf, for the name's "apple of the earth". Its drawing space
 * is a 440 by 360 unit window on the map, the pin drawn at two and a half
 * times the trail's scale so the apple reads. It's decoration, so it's
 * hidden from screen readers.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props - This component does not use any props.
 *
 * @returns The map's SVG element.
 *
 * @example
 * ```tsx
 * FooMapCom() // => <FooMapCom />
 * ```
 *
*/

function FooMapCom () : React.JSX.Element {


	return (


		<svg
			className={ cssModObj.fooMapSvg }

			viewBox='740 20 440 360'

			aria-hidden='true'
		>{ /* What: Footer Map SVG Element. Why: The footer echoes the hero's trail map, quietly. How: This draws the map's window at the size its stylesheet gives it, hidden from screen readers as decoration. */ }


			<g className={ cssModObj.mapConGro }>{ /* What: Map Contours Group Element. Why: Contour lines read as a map without competing with the footer's words. How: This strokes every line in the group in the raised navy, with no fill. */ }


				<path d='M820 60c90-50 230-40 300 40s50 170-40 220-230 30-290-40-60-170 30-220z' />{ /* What: Map Contour Path Element. Why: The contours ring a rise of ground. How: This is the outermost line. */ }

				<path d='M860 110c70-35 170-25 220 30s35 120-30 155-165 20-210-30-45-120 20-155z' />{ /* What: Map Contour Path Element. Why: The contours ring a rise of ground. How: This is the middle line. */ }

				<path d='M900 160c45-20 110-15 140 20s20 75-20 95-105 12-130-20-25-75 10-95z' />{ /* What: Map Contour Path Element. Why: The contours ring a rise of ground. How: This is the innermost line. */ }


			</g>



			<path
				className={ cssModObj.mapTraPat }

				d='M560 370c80-40 150-90 230-110s130-40 170-90'
			/>{ /* What: Map Trail Path Element. Why: A dotted trail leads to the footer's pin, as on the hero's map. How: This strokes a dotted coral line from the lower middle up to the pin's tip. */ }



			<g transform='translate( 960 170 ) scale( 2.5 ) translate( -960 -170 )'>{ /* What: Map Pin Group Element. Why: The trail ends at a pin, and the pin's head is a little apple, for "apple of the earth". How: This groups the pin, the apple, its stem, and its leaf, enlarged two and a half times around the pin's tip so the apple reads at the map's small size. */ }


				<path
					className={ cssModObj.pinBodPat }

					d='M960 170c0 0-15-17-15-29a15 15 0 0 1 30 0c0 12-15 29-15 29z'
				/>{ /* What: Pin Body Path Element. Why: The marker stands where the trail ends. How: This fills the teardrop in the pale blue gray. */ }

				<path
					className={ cssModObj.pinAppPat }

					d='M960 135c-3-3-10-3-11 4s4 12 8 11c1 0 2-1 3-1s2 1 3 1c4 1 9-4 8-11s-8-7-11-4z'
				/>{ /* What: Pin Apple Path Element. Why: The pin's head is an apple, the name's "apple of the earth". How: This fills a small apple shape in coral at the head's center. */ }

				<path
					className={ cssModObj.pinStePat }

					d='M960 135c0-3 1-5 3-7'
				/>{ /* What: Pin Stem Path Element. Why: An apple needs its stem. How: This strokes a short curve up from the apple's top. */ }

				<path
					className={ cssModObj.pinLeaPat }

					d='M963 129c2-5 7-6 10-5-1 4-5 7-10 5z'
				/>{ /* What: Pin Leaf Path Element. Why: A leaf finishes the apple. How: This fills a small leaf beside the stem in the leaf green. */ }


			</g>


		</svg>


	);


}

// #endregion FooMapCom



// #region SitFooCom

/**
 * SitFooCom = Site Footer Component
 *
 * @summary
 * Renders the footer below its wave: the brand, which returns to the home
 * page, the guide's one-line summary, and the note on the name; the two link
 * columns from FOO_COL_ARR inside a navigation landmark labelled "Footer",
 * so screen readers can tell it from the bar's; the small map, shown above
 * 960px wide; the towns row, a landmark labelled "Towns", linking to the
 * listing filtered to each town in TOW_NAM_ARR; and the closing row, whose
 * copyright reads the current year and whose project note opens
 * techgeek.dev in a new tab, saying so to screen readers.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props - This component does not use any props.
 *
 * @returns The footer element.
 *
 * @example
 * ```tsx
 * SitFooCom() // => <SitFooCom />
 * ```
 *
*/

function SitFooCom () : React.JSX.Element {


	const curYeaNum = new Date().getFullYear(); // What: Current Year Number. Why: The copyright names the current year. How: This reads it from the visitor's clock.



	return (


		<footer className={ cssModObj.sitFooFoo }>{ /* What: Site Footer Footer Element. Why: Every page ends with the shared footer. How: This sets it on the deep navy, with generous room above and below its content, its wave rising above it. */ }


			<FooWavCom />{ /* What: Footer Wave Component. Why: The footer rises from the page like the lake's edge. How: This draws the layered waves along its top. */ }



			<div className={ cssModObj.fooInnDiv }>{ /* What: Footer Inner Div Element. Why: The footer's content sits in the page's centered column. How: This stacks the top block above the closing row. */ }


				<div className={ cssModObj.fooTopDiv }>{ /* What: Footer Top Div Element. Why: The brand, the link columns, and the small map lead the footer. How: This sets the brand, the columns, and the map side by side above 960px wide, drops the map from 960px down to 641px, and stacks the brand above the columns at 640px and below. */ }


					<div className={ cssModObj.fooBraDiv }>{ /* What: Footer Brand Div Element. Why: The footer names the guide and says in a line what it is. How: This stacks the brand link above the tagline. */ }


						<Link
							className={ cssModObj.fooBraAnc }

							to='/'
						>{ /* What: Footer Brand Anchor Link. Why: The brand is the way back to the home page. How: This links to the root path. */ }


							<BraMarCom />{ /* What: Brand Mark Component. Why: The brand opens with the site's mark. How: This draws the mark, hidden from screen readers, so the link is announced by the name alone. */ }

							<span>Lake Pomme de Terre <span className={ cssModObj.fooEatSpa }>Eats</span></span>{ /* What: Footer Name Span Element. Why: The footer names the site, its last word in coral as in the bar. How: This shows the name beside the mark. */ }


						</Link>



						<p className={ cssModObj.fooTagPar }>Every place to eat around Lake Pomme de Terre, from Hermitage to Pittsburg to Wheatland, gathered in one guide.</p>{ /* What: Footer Tagline Paragraph Element. Why: The footer says in a line what the guide is. How: This shows the summary in a quiet pale blue. */ }

						<p className={ cssModObj.fooSigPar }>Pomme de terre: French for potato, or, word for word, "apple of the earth."</p>{ /* What: Footer Sign-Off Paragraph Element. Why: The name is half the charm, and a visitor may wonder what it means. How: This gives the French and its word-for-word meaning in the light coral. */ }


					</div>



					<nav
						className={ cssModObj.fooLinNav }

						aria-label='Footer'
					>{ /* What: Footer Links Nav Element. Why: The footer's links need their own landmark, labelled to tell it from the bar's. How: This sets the two columns side by side, labelled "Footer". */ }


						{ FOO_COL_ARR.map( ( colRecObj ) => ( // What: Column Map. Why: Each group of links gets a column. How: This renders one column per row of FOO_COL_ARR.


							<div
								key={ colRecObj.heaStr }

								className={ cssModObj.fooColDiv }
							>{ /* What: Footer Column Div Element. Why: Each group of links reads as a column under its heading. How: This stacks the heading above its list. */ }


								<h2 className={ cssModObj.fooColHea }>{ colRecObj.heaStr }</h2>{ /* What: Footer Column Heading Element. Why: Each column says what its links are for. How: This shows the heading in small uppercase letters. */ }



								<ul className={ cssModObj.fooLinUno }>{ /* What: Footer Links Unordered Element. Why: A column's links are a list, which screen readers count. How: This stacks them with room between. */ }


									{ colRecObj.linArr.map( ( linRecObj ) => ( // What: Link Map. Why: Each link gets a list item. How: This renders one item per row of the column's links.


										<li key={ linRecObj.patStr }>{ /* What: Footer Link Item Element. Why: Each link is one item of the list. How: This holds the row's link. */ }


											<Link
												className={ cssModObj.fooLinAnc }

												to={ linRecObj.patStr }
											>{ linRecObj.labStr }</Link>{ /* What: Footer Link Anchor Link. Why: Each link takes the visitor to its page. How: This routes to the row's path. */ }


										</li>


									))}


								</ul>


							</div>


						))}


					</nav>



					<FooMapCom />{ /* What: Footer Map Component. Why: The footer echoes the hero's trail map, ending at an apple. How: This draws the small map beside the link columns, above 960px wide. */ }


				</div>



				<nav
					className={ cssModObj.fooTowNav }

					aria-label='Towns'
				>{ /* What: Footer Towns Nav Element. Why: Visitors look for places near where they're staying, and the footer can take them straight there. How: This sets a heading above a wrapping row of town links, labelled "Towns" to tell it from the other landmarks. */ }


					<h2 className={ cssModObj.fooColHea }>Places to eat in</h2>{ /* What: Footer Column Heading Element. Why: The row says what its links are for. How: This shows the heading in small uppercase letters. */ }


					<ul className={ cssModObj.fooTowUno }>{ /* What: Footer Towns Unordered Element. Why: The towns are a list, which screen readers count. How: This sets them in a row that wraps. */ }


						{ TOW_NAM_ARR.map( ( towNamStr ) => ( // What: Town Link Map. Why: Each town gets a link. How: This renders one item per town in the guide.


							<li key={ towNamStr }>{ /* What: Footer Town Item Element. Why: Each town is one item of the list. How: This holds the town's link. */ }


								<Link
									className={ cssModObj.fooLinAnc }

									to={ `/places?town=${ encodeURIComponent( towNamStr ) }` } // What: Town Listing Address. Why: The link should open the listing already narrowed to the town. How: This names the town in the listing's query.
								>{ towNamStr }</Link>{ /* What: Footer Link Anchor Link. Why: Each town's link opens its places. How: This routes to the listing filtered to the town. */ }


							</li>


						))}


					</ul>


				</nav>



				<div className={ cssModObj.fooBotDiv }>{ /* What: Footer Bottom Div Element. Why: The footer closes with the fine print, set apart below a rule. How: This sets the copyright and the project note at the row's two ends above 640px wide, and stacks them at 640px and below. */ }


					<p className={ cssModObj.fooCopPar }>© { curYeaNum } Lake Pomme de Terre Eats. All rights reserved.</p>{ /* What: Footer Copyright Paragraph Element. Why: The footer states the site's copyright. How: This shows it with the current year. */ }

					<p className={ cssModObj.fooCopPar }>A project by <a className={ cssModObj.fooBuiAnc } href={ BUI_URL_STR } rel='noopener noreferrer' target='_blank'>techgeek.dev<span className={ cssModObj.visHidSpa }> (opens in a new tab)</span></a></p>{ /* What: Footer Copyright Paragraph Element. Why: The site credits its builder. How: This links to techgeek.dev in a new tab, which can't reach back to this one, its hidden note telling screen reader users about the new tab. */ }


				</div>


			</div>


		</footer>


	);


}

// #endregion SitFooCom

// #endregion Components



// #region Exports

export { SitFooCom }; // What: Named Export. Why: The app root renders the footer below the routes. How: This exports SitFooCom.

// #endregion Exports


