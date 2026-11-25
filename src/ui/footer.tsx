


// #region Imports

import cssModObj from './footer.module.css'; // What: CSS Module Object. Why: The footer is styled in its own module, whose class names Vite hashes. How: Each class an element carries is read from this object.


import { BraMarCom } from './brand-mark.tsx'; // What: Brand Mark Component. Why: The footer's brand opens with the site's mark. How: This draws it beside the name.
import { Link      } from 'react-router';     // What: Link. Why: The footer's links move between routes without a full page load. How: This renders each one as a router link.

// #endregion Imports



/**
 * footer.tsx = Site Footer
 *
 * @summary
 * The footer every page ends with, on the deep navy: the brand and a line on
 * what the guide is, two columns of links (the guide's pages, and the ways
 * in for owners), and a closing row with the copyright and a note that the
 * site is a project by techgeek.dev. The brand and the link columns sit side
 * by side above 640px wide and stack at 640px and below, where the closing
 * row stacks too. Its colors come from the color tokens, so an eating
 * place's own page can restyle it by setting its own.
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

// #region SitFooCom

/**
 * SitFooCom = Site Footer Component
 *
 * @summary
 * Renders the footer: the brand, which returns to the home page, and the
 * guide's one-line summary; the two link columns from FOO_COL_ARR inside a
 * navigation landmark labelled "Footer", so screen readers can tell it from
 * the bar's; and the closing row, whose copyright reads the current year and
 * whose project note opens techgeek.dev in a new tab, saying so to screen
 * readers.
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


		<footer className={ cssModObj.sitFooFoo }>{ /* What: Site Footer Footer Element. Why: Every page ends with the shared footer. How: This sets it on the deep navy, with generous room above and below its content. */ }


			<div className={ cssModObj.fooInnDiv }>{ /* What: Footer Inner Div Element. Why: The footer's content sits in the page's centered column. How: This stacks the top block above the closing row. */ }


				<div className={ cssModObj.fooTopDiv }>{ /* What: Footer Top Div Element. Why: The brand and the link columns lead the footer. How: This sets the brand beside the columns above 640px wide, and stacks them at 640px and below. */ }


					<div className={ cssModObj.fooBraDiv }>{ /* What: Footer Brand Div Element. Why: The footer names the guide and says in a line what it is. How: This stacks the brand link above the tagline. */ }


						<Link
							className={ cssModObj.fooBraAnc }

							to='/'
						>{ /* What: Footer Brand Anchor Link. Why: The brand is the way back to the home page. How: This links to the root path. */ }


							<BraMarCom />{ /* What: Brand Mark Component. Why: The brand opens with the site's mark. How: This draws the mark, hidden from screen readers, so the link is announced by the name alone. */ }

							<span>Lake Pomme de Terre <span className={ cssModObj.fooEatSpa }>Eats</span></span>{ /* What: Footer Name Span Element. Why: The footer names the site, its last word in coral as in the bar. How: This shows the name beside the mark. */ }


						</Link>



						<p className={ cssModObj.fooTagPar }>Every place to eat around Lake Pomme de Terre, from Hermitage to Pittsburg to Wheatland, gathered in one guide.</p>{ /* What: Footer Tagline Paragraph Element. Why: The footer says in a line what the guide is. How: This shows the summary in a quiet pale blue. */ }


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


				</div>



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


