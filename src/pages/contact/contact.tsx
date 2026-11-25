


// #region Imports

import cssModObj from './contact.module.css'; // What: CSS Module Object. Why: The Contact page is styled in its own module, whose class names Vite hashes. How: Each class an element carries is read from this object.


import { usePagDesFun    } from '../../ui/page-description.ts'; // What: Use Page Description Function. Why: The Contact page has its own search description. How: This swaps index.html's description tag while the page shows.
import { useEffect       } from 'react';                       // What: Use Effect. Why: Focus has to move once the thank-you, the form, or an error appears. How: This runs each move after the render that shows it.
import { useRef          } from 'react';                       // What: Use Ref. Why: The focus moves need the fields and headings themselves. How: This attaches a reference to each.
import { useSearchParams } from 'react-router';                // What: Use Search Params. Why: A link may name the message's reason and its place. How: This reads the address's query.
import { useState        } from 'react';                       // What: Use State. Why: The form's fields and its sending, sent, and error states change as it's used. How: This holds each.

// #endregion Imports



/**
 * contact.tsx = Contact Page
 *
 * @summary
 * The page owners and visitors write in from: a heading and a lead, the
 * message form beside notes on what to include and the guide's email
 * address, which stack below the form at 960px wide and below. The form
 * sends through Netlify Forms, which emails each message on; a link can
 * choose its reason and name its place ahead of time, as the owners'
 * buttons and the place cards do. Once sent, a thank-you takes the form's
 * place, and a failed send says so in an alert above the button.
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

const CON_EMA_STR = 'contact@pommedeterreeats.com'; // What: Contact Email String. Why: The page offers the guide's address for anyone who'd rather write directly, and a failed send points there too. How: The notes' link and the error message read it.
const EMP_FOR_OBJ = { 'bot-field' : '', email : '', message : '', name : '', place : '', reason : '' }; // What: Empty Form Object. Why: The form starts empty, apart from what the address names, and empties again for another message. How: This holds a blank value for every field Netlify reads.

const REA_OPT_ARR = [ // What: Reason Option Array. Why: The reason menu offers a fixed list, and the email names the chosen one. How: Each row names a reason's key, which a link's address can use, and its label.


	{ ideStr : 'add',      labStr : 'Add my place to the guide'   }, // What: Add Reason Row. Why: Owners of places not yet listed are the form's main audience. How: This is the reason the owners' "Add" buttons choose.
	{ ideStr : 'update',   labStr : 'Update my listing'           }, // What: Update Reason Row. Why: Owners of listed places send changes. How: This is the reason the "Update" links and the place cards choose.
	{ ideStr : 'tip',      labStr : 'Suggest a place or a change' }, // What: Tip Reason Row. Why: Visitors know places too, and spot what's changed. How: This is for anyone who isn't the owner.
	{ ideStr : 'question', labStr : 'Ask a question'              }  // What: Question Reason Row. Why: Anything else still needs a way in. How: This is the catch-all.


];

// #endregion Constants



// #region Components

// #region ConPagCom

/**
 * ConPagCom = Contact Page Component
 *
 * @summary
 * Renders the Contact page. The reason menu starts on the address's reason
 * when it names one on the list, and the place field on the address's
 * place, so a card's owner link lands on a form that already knows the
 * place. A send runs only once the browser has passed the required fields
 * and the email format, posting the fields form-encoded to the site's root
 * under the contact form's name, which Netlify matches to the hidden copy
 * of the form in index.html. While it's out the button reads "Sending...";
 * an OK reply swaps the form for the thank-you and moves focus to its
 * heading, and a failure is logged and shown in the alert above the button,
 * focus returning to the button. "Send another message" brings back an
 * empty form, focus landing on its first field.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props - This component does not use any props.
 *
 * @returns The page's wrapper div.
 *
 * @example
 * ```tsx
 * ConPagCom() // => <ConPagCom />
 * ```
 *
*/

function ConPagCom () : React.JSX.Element {


	usePagDesFun( 'Own a place to eat near Lake Pomme de Terre? Ask to add it to the guide or send changes to its listing. Tips welcome too.' ); // What: Page Description Call. Why: Search listings should describe this page, not repeat the home page. How: This swaps the one description tag's text for the page's own while it shows.



	// #region Form State

	const [ seaParObj ] = useSearchParams(); // What: Search Parameters Object. Why: A link may name the reason and the place. How: This reads the address's query.

	const forNamRef = useRef< HTMLInputElement >( null );                                                    // What: Form Name Reference. Why: Focus returns to the first field when the form comes back from the thank-you. How: This holds the name input.
	const rawReaStr = seaParObj.get( 'reason' ) ?? '';                                                       // What: Raw Reason String. Why: The address may name a reason, or nothing. How: This reads the reason parameter, or an empty string.
	const retForRef = useRef( false );                                                                       // What: Return Form Reference. Why: Only a return from the thank-you moves focus to the name field, never a first visit. How: This starts false, and resForFun sets it true.
	const staReaStr = REA_OPT_ARR.some( ( reaOptObj ) => reaOptObj.ideStr === rawReaStr ) ? rawReaStr : ''; // What: Starting Reason String. Why: Only a real reason should be chosen ahead of time. How: This keeps the address's reason when it's on the list, or leaves the menu unchosen.
	const subForRef = useRef< HTMLButtonElement >( null );                                                   // What: Submit Form Reference. Why: A failed send puts focus back on the send button. How: This holds the button.
	const sucTitRef = useRef< HTMLHeadingElement >( null );                                                  // What: Success Title Reference. Why: The thank-you's heading takes focus once it appears. How: This holds the heading element.

	const [ errMesStr, setErrMesStr ] = useState< string | null >( null ); // What: Error Message String And Setter. Why: A failed send has to say so above the button. How: This starts with no error.
	const [ forDatObj, setForDatObj ] = useState( () => ( { ...EMP_FOR_OBJ, place : seaParObj.get( 'place' ) ?? '', reason : staReaStr } ) ); // What: Form Data Object And Setter. Why: The fields are controlled, so their values live here. How: This starts with every field blank but the reason and the place, which take the address's.
	const [ isaLoaBoo, setIsaLoaBoo ] = useState( false ); // What: Is-A Loading Boolean And Setter. Why: The button reads "Sending..." while the message is on its way. How: This starts false.
	const [ isaSenBoo, setIsaSenBoo ] = useState( false ); // What: Is-A Sent Boolean And Setter. Why: A sent message swaps the form for a thank-you. How: This starts false.



	const chaFieFun = ( chaEveObj : React.ChangeEvent< HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement > ) => setForDatObj( ( preForObj ) => ( { ...preForObj, [ chaEveObj.target.name ] : chaEveObj.target.value } ) ); // What: Change Field Function. Why: Every field writes its edits into the form's state. How: This copies the previous fields and replaces the one named by the edited field's name attribute, which has to match a key of EMP_FOR_OBJ.



	const resForFun = () => { // What: Reset Form Function. Why: The thank-you's button lets a visitor send another message. How: This marks the form as returning, hides the thank-you, and empties the fields.


		retForRef.current = true; // What: Return Flag Set. Why: The return focus effect moves focus to the name field only when the form comes back from the thank-you. How: This marks the return before the swap renders, so the effect after it already reads it.


		setIsaSenBoo( false ); // What: Sent Flag Reset Call. Why: The form shows again in place of the thank-you. How: This clears the sent flag.

		setForDatObj( EMP_FOR_OBJ ); // What: Fields Reset Call. Why: The next message starts blank. How: This restores the empty form.


	};

	// #endregion Form State



	// #region Focus Handling

	useEffect( () => { // What: Success Focus Effect. Why: A screen reader should hear the message went out, and the thank-you should be in view. How: This moves focus to the thank-you's heading, which scrolls it into view.


		if ( isaSenBoo ) sucTitRef.current?.focus(); // What: Heading Focus Call. Why: The thank-you replaces the focused button, and focus must land on it rather than fall to the page. How: This focuses the heading once the thank-you shows.


	}, [ isaSenBoo ] ); // What: Effect Dependency Array. Why: Focus moves only when the thank-you appears. How: isaSenBoo turning true reruns the effect.



	useEffect( () => { // What: Return Focus Effect. Why: Sending another message removes the focused button with the thank-you, and focus must land on the form that replaces it. How: This focuses the name field once the form returns from the thank-you.


		if ( !isaSenBoo && retForRef.current ) forNamRef.current?.focus(); // What: Name Field Focus Call. Why: A visitor sending another message starts at the first field, while a first visit shouldn't move focus at all. How: This focuses the name input only after resForFun has marked the return.


	}, [ isaSenBoo ] ); // What: Effect Dependency Array. Why: Focus moves only when the thank-you gives way to the form. How: isaSenBoo turning false reruns the effect.



	useEffect( () => { // What: Error Focus Effect. Why: The send button is disabled while the message sends, which can drop its focus to the page. How: This focuses the button again once a failed send shows its error.


		if ( errMesStr ) subForRef.current?.focus(); // What: Send Focus Call. Why: The visitor can try again from where they were. How: This focuses the button, enabled again by the same render that shows the error.


	}, [ errMesStr ] ); // What: Effect Dependency Array. Why: Focus moves back only when a send fails. How: errMesStr gains its message when a send fails, and clears as the next one starts.

	// #endregion Focus Handling



	// #region subForFun

	/**
	 * subForFun = Submit Form Function
	 *
	 * @summary
	 * Sends the message through Netlify Forms, running only once the browser
	 * has passed the required fields and the email format. It stops the
	 * browser's own submission, marks the form as sending, and clears any
	 * earlier error, then posts the fields form-encoded to the site's root
	 * under the contact form's name, with the reason's label, or Not chosen
	 * when none was, and the honeypot as it stands. Only an OK reply counts
	 * as success; a failed reply or a network failure is logged and shown as
	 * an error above the button. Sending ends either way.
	 *
	 * @author z4nta0 <https://github.com/z4nta0>
	 *
	 * @param subEveObj - Submit Event Object: The form's submit event.
	 *
	 * @returns A promise that settles once the send has succeeded or failed,
	 *          with no value.
	 *
	 * @example
	 * ```ts
	 * subForFun(subEveObj) // => Promise<void>
	 * ```
	 *
	*/

	const subForFun = async ( subEveObj : React.FormEvent ) => { // What: Submit Form Function. Why: The form's submission sends the message. How: This posts the fields to Netlify Forms and records the outcome.


		subEveObj.preventDefault(); // What: Default Submission Prevention Call. Why: The browser would otherwise reload the page to submit the form. How: This stops it, so the message is sent in the background.

		setIsaLoaBoo( true ); // What: Loading Flag Set Call. Why: The button reads "Sending..." while the message is on its way. How: This sets the loading flag.

		setErrMesStr( null ); // What: Error Clear Call. Why: A new attempt shouldn't show the last one's error. How: This clears it.



		try { // What: Send Attempt Try. Why: The post can fail on the network or at Netlify. How: This posts the fields and, on an OK reply, shows the thank-you.


			const senResObj = await fetch( '/', { // What: Send Response Object. Why: Netlify Forms takes a form-encoded POST on any path of the site, matches it to a detected form by its form-name field, and emails it on. How: This posts the fields to the site's root.


				headers : { 'Content-Type' : 'application/x-www-form-urlencoded' }, // What: Headers. Why: The fields go form-encoded, the way Netlify's docs send a form from a script. How: This sets the matching content type.
				method  : 'POST',                                                   // What: Method. Why: A form submission is a POST. How: This sets it.

				body : new URLSearchParams({ // What: Body. Why: Netlify reads a standard form-encoded body whose field names match the hidden form in index.html. How: This encodes the form's name, the honeypot, and the five real fields.


					'bot-field' : forDatObj[ 'bot-field' ],                                                                         // What: Bot Field. Why: Netlify drops a submission whose honeypot is filled, which a person never does. How: This posts the hidden field as it stands.
					email       : forDatObj.email,                                                                                  // What: Email. Why: Netlify sets a field named email as the notification's reply-to, so a reply goes straight back to the visitor. How: This sends the address they entered.
					'form-name' : 'contact',                                                                                        // What: Form Name. Why: Netlify matches the POST to its detected form by this field. How: This names the contact form.
					message     : forDatObj.message,                                                                                // What: Message. Why: The message is the point of the email. How: This sends what they wrote.
					name        : forDatObj.name,                                                                                   // What: Name. Why: The email says who wrote. How: This sends the name they entered.
					place       : forDatObj.place,                                                                                  // What: Place. Why: The email names the place the message is about. How: This sends the place they entered, or nothing.
					reason      : REA_OPT_ARR.find( ( reaOptObj ) => reaOptObj.ideStr === forDatObj.reason )?.labStr ?? 'Not chosen' // What: Reason. Why: The email shows the reason by name. How: This sends the chosen reason's label, or Not chosen when none was.


				}).toString() // What: Body String Call. Why: Netlify reads the fields as one form-encoded string. How: This serializes the URLSearchParams into it.


			} );


			if ( !senResObj.ok ) throw new Error( `Netlify Forms answered with status ${ senResObj.status }.` ); // What: Failed Reply Guard. Why: Netlify can take the connection yet reject the submission, which must not show the thank-you. How: This throws into the catch below.



			setIsaSenBoo( true ); // What: Sent Flag Set Call. Why: The message went out. How: This swaps the form for the thank-you.


		}

		catch ( errCatObj ) { // What: Send Failure Catch. Why: A failed send must tell the visitor what to do. How: This logs the error and shows the message.


			console.warn( errCatObj ); // What: Error Warning Call. Why: A failed send should stay visible to anyone debugging. How: This logs the error.

			setErrMesStr( `Your message didn't send. Please try again, or email it to ${ CON_EMA_STR }.` ); // What: Error Message Set Call. Why: The visitor needs to know the message didn't go out and how else to send it. How: This shows the error above the button.


		}

		finally { // What: Send End Finally. Why: Sending is over either way. How: This clears the loading flag whether the send worked or not.


			setIsaLoaBoo( false ); // What: Loading Flag Clear Call. Why: Sending is over whether it worked or not. How: This clears the loading flag.


		}


	};

	// #endregion subForFun



	return (


		<div className={ cssModObj.conPagDiv }>{ /* What: Contact Page Div Element. Why: The page arrives gently and holds its heading and its two columns in order. How: This fades the page in and stacks them in the page's centered column. */ }


			<title>Contact Lake Pomme de Terre Eats</title>{ /* What: Page Title Element. Why: A visitor's tab, history, and search listings should name the page. How: React places this ahead of index.html's title while the page shows. */ }

			<link
				href='https://pommedeterreeats.com/contact'
				rel='canonical'
			/>{ /* What: Page Canonical Link Element. Why: Every address that reaches the page, with or without a reason, should count as one page. How: React places this in the head while the page shows. */ }

			<div className={ cssModObj.conHeaDiv }>{ /* What: Contact Heading Div Element. Why: The page opens by saying who it's for. How: This stacks the eyebrow, the heading, and the lead. */ }


				<p className={ cssModObj.conEyePar }>Get in touch</p>{ /* What: Contact Eyebrow Paragraph Element. Why: A short label names the page. How: This shows it small and uppercase in the coral's text shade. */ }

				<h1 className={ cssModObj.conTitHea }>Add your place, or tell us what's changed</h1>{ /* What: Contact Title Heading Element. Why: The page's one heading says what the form is mostly for. How: This shows it large in navy. */ }

				<p className={ cssModObj.conLeaPar }>Own a place to eat around Lake Pomme de Terre? Send us its details and we'll add it to the guide, or send changes to its listing. Visitors with a tip or a question are welcome too.</p>{ /* What: Contact Lead Paragraph Element. Why: A visitor should know who the form is for. How: This invites owners first, then everyone else. */ }


			</div>



			<div className={ cssModObj.conGriDiv }>{ /* What: Contact Grid Div Element. Why: The form and the notes sit side by side on a wide screen. How: This sets the form in a wider column beside the notes above 960px wide, and stacks the notes below the form at 960px and below. */ }


				<div className={ cssModObj.forWraDiv }>{ /* What: Form Wrap Div Element. Why: The form and its thank-you share one white panel. How: This holds whichever one shows. */ }


					{ isaSenBoo ? ( // What: Sent Or Form Check. Why: A sent message replaces the form with a thank-you. How: This renders the thank-you once sent, or the form otherwise.


						<div className={ cssModObj.sucStaDiv }>{ /* What: Success State Div Element. Why: A visitor learns the message went out and what happens next. How: This rises into view with its heading, text, and button. */ }


							<h2
								ref={ sucTitRef }

								className={ cssModObj.sucTitHea }

								tabIndex={ -1 } // What: Programmatic Focus Target. Why: The heading takes focus after sending without becoming a Tab stop. How: A tabIndex of -1 lets script focus it while Tab skips it.
							>Message sent. Thank you!</h2>{ /* What: Success Title Heading Element. Why: The thank-you's heading says what happened. How: This shows it, taking focus as the thank-you appears. */ }

							<p className={ cssModObj.sucTexPar }>We read every message and will reply by email.</p>{ /* What: Success Text Paragraph Element. Why: A visitor should know what happens next. How: This says a reply comes by email. */ }

							<button
								className={ cssModObj.butOutBut }

								type='button'

								onClick={ resForFun }
							>Send another message</button>{ /* What: Button Outline Button Element. Why: A visitor may have more to send. How: This empties the form and shows it again. */ }


						</div>


					) : ( // What: Form Branch. Why: Until a message is sent, the form shows. How: This renders the form.


						<form
							className={ cssModObj.conForFor }

							name='contact'

							onSubmit={ subForFun }
						>{ /* What: Contact Form Form Element. Why: The page's main action is sending a message. How: This stacks the fields, the alert, and the button, setting the name and email side by side above 640px wide and stacking them at 640px and below, and sends through subForFun once the browser passes the fields. */ }


							<p
								className={ cssModObj.honPotPar }

								aria-hidden='true'
							>{ /* What: Honeypot Paragraph Element. Why: Bots fill every field they find, which a person never sees. How: This holds the hidden honeypot field, moved off the screen and out of the accessibility tree. */ }


								<label>Leave this field blank <input name='bot-field' tabIndex={ -1 } value={ forDatObj[ 'bot-field' ] } onChange={ chaFieFun } /></label>{ /* What: Honeypot Label Element. Why: A filled honeypot marks a bot. How: This wraps the bot-field input, which Tab skips, writing into the form's state through the shared change handler. */ }


							</p>


							<div className={ cssModObj.forRowDiv }>{ /* What: Form Row Div Element. Why: The name and email are short and sit together. How: This sets their fields side by side above 640px wide, and stacks them at 640px and below. */ }


								<div className={ cssModObj.forFieDiv }>{ /* What: Form Field Div Element. Why: Each field's label sits above it. How: This stacks the name's label above its box. */ }


									<label
										className={ cssModObj.forLabLab }

										htmlFor='conNamInp'
									>Your name</label>{ /* What: Form Label Label Element. Why: The box needs a visible name. How: This labels the name field. */ }

									<input
										id='conNamInp'
										ref={ forNamRef }

										className={ cssModObj.forConInp }

										name='name'

										autoComplete='name'
										required
										type='text'
										value={ forDatObj.name }

										onChange={ chaFieFun }
									/>{ /* What: Form Control Input Element. Why: The email should say who wrote. How: This is the required name field. */ }


								</div>

								<div className={ cssModObj.forFieDiv }>{ /* What: Form Field Div Element. Why: Each field's label sits above it. How: This stacks the email's label above its box. */ }


									<label
										className={ cssModObj.forLabLab }

										htmlFor='conEmaInp'
									>Your email</label>{ /* What: Form Label Label Element. Why: The box needs a visible name. How: This labels the email field. */ }

									<input
										id='conEmaInp'

										className={ cssModObj.forConInp }

										name='email'

										autoComplete='email'
										required
										type='email'
										value={ forDatObj.email }

										onChange={ chaFieFun }
									/>{ /* What: Form Control Input Element. Why: A reply needs an address. How: This is the required email field, which the browser checks for an address's shape. */ }


								</div>


							</div>


							<div className={ cssModObj.forFieDiv }>{ /* What: Form Field Div Element. Why: Each field's label sits above it. How: This stacks the reason's label above its menu. */ }


								<label
									className={ cssModObj.forLabLab }

									htmlFor='conReaSel'
								>What's this about?</label>{ /* What: Form Label Label Element. Why: The menu needs a visible name. How: This labels the reason menu. */ }


								<select
									id='conReaSel'

									className={ cssModObj.forConSel }

									name='reason'

									required
									value={ forDatObj.reason }

									onChange={ chaFieFun }
								>{ /* What: Form Control Select Element. Why: The guide should know at a glance what each message is for. How: This offers the reasons, required, starting on the address's reason when it names one. */ }


									<option value=''>Choose one</option>{ /* What: Choose Option Element. Why: The menu shouldn't guess a reason. How: Its empty value fails the required check until a reason is chosen. */ }

									{ REA_OPT_ARR.map( ( reaOptObj ) => <option key={ reaOptObj.ideStr } value={ reaOptObj.ideStr }>{ reaOptObj.labStr }</option> ) }{ /* What: Reason Option Map. Why: Each reason gets an option. How: This renders one option per row of REA_OPT_ARR, its key as its value. */ }


								</select>


							</div>


							<div className={ cssModObj.forFieDiv }>{ /* What: Form Field Div Element. Why: Each field's label sits above it. How: This stacks the place's label and hint above its box. */ }


								<label
									className={ cssModObj.forLabLab }

									htmlFor='conPlaInp'
								>Place name <span className={ cssModObj.forOptSpa }>(if it's about one)</span></label>{ /* What: Form Label Label Element. Why: The box needs a visible name, and should say it's optional. How: This labels the place field, its note in a quieter span. */ }

								<input
									id='conPlaInp'

									className={ cssModObj.forConInp }

									name='place'

									autoComplete='organization'
									type='text'
									value={ forDatObj.place }

									onChange={ chaFieFun }
								/>{ /* What: Form Control Input Element. Why: A message about one place should name it. How: This is the optional place field, starting on the address's place when it names one. */ }


							</div>

							<div className={ cssModObj.forFieDiv }>{ /* What: Form Field Div Element. Why: Each field's label sits above it. How: This stacks the message's label above its box. */ }


								<label
									className={ cssModObj.forLabLab }

									htmlFor='conMesTex'
								>Your message</label>{ /* What: Form Label Label Element. Why: The box needs a visible name. How: This labels the message field. */ }

								<textarea
									id='conMesTex'

									className={ cssModObj.forConTex }

									name='message'

									placeholder='For a new place: its address, phone, hours, and a link to its menu or page.'
									required
									rows={ 6 }
									value={ forDatObj.message }

									onChange={ chaFieFun }
								/>{ /* What: Form Control Textarea Element. Why: The message is the point of the form. How: This is the required message field, its placeholder saying what a new place's message should hold. */ }


							</div>

							<div
								className={ cssModObj.errAleDiv }

								role='alert'
							>{ errMesStr }</div>{ /* What: Error Alert Div Element. Why: A failed send has to be heard as well as seen. How: This alert region is in the page and empty from the first render, gaining the error message when a send fails, and leaves the layout while it's empty. */ }

							<button
								ref={ subForRef }

								className={ cssModObj.butSolBut }

								disabled={ isaLoaBoo }
								type='submit'
							>{ isaLoaBoo ? 'Sending...' : 'Send message' }</button>{ /* What: Button Solid Button Element. Why: The form needs one clear way to send. How: This submits the form, reading "Sending..." and disabled while the message is out. */ }


						</form>


					) }


				</div>



				<aside className={ cssModObj.conNotAsi }>{ /* What: Contact Notes Aside Element. Why: Owners should know what to send, and anyone may prefer plain email. How: This stacks two notes beside the form above 960px wide, and below it at 960px and below. */ }


					<div className={ cssModObj.notCarDiv }>{ /* What: Note Card Div Element. Why: Each note reads as a panel of its own. How: This holds the owners' checklist. */ }


						<h2 className={ cssModObj.notTitHea }>Adding a place?</h2>{ /* What: Note Title Heading Element. Why: Each note names its subject. How: This shows the note's heading. */ }

						<p className={ cssModObj.notTexPar }>Include as much of this as you can:</p>{ /* What: Note Text Paragraph Element. Why: The list needs an introduction. How: This leads into it. */ }


						<ul className={ cssModObj.notLisUno }>{ /* What: Note List Unordered Element. Why: The details an owner should send read as a checklist. How: This lists them. */ }


							<li>The place's name and address</li>{ /* What: Note Item Element. Why: A listing starts with where the place is. How: This asks for its name and address. */ }

							<li>A phone number</li>{ /* What: Note Item Element. Why: Visitors like to call ahead. How: This asks for a number. */ }

							<li>Your hours, and whether you close for the season</li>{ /* What: Note Item Element. Why: Lakeside places often keep seasonal hours. How: This asks for both. */ }

							<li>A link to your menu, website, or Facebook page</li>{ /* What: Note Item Element. Why: A listing links to the place's own page. How: This asks for one. */ }


						</ul>


					</div>


					<div className={ cssModObj.notCarDiv }>{ /* What: Note Card Div Element. Why: Each note reads as a panel of its own. How: This holds the email note. */ }


						<h2 className={ cssModObj.notTitHea }>Rather email?</h2>{ /* What: Note Title Heading Element. Why: Each note names its subject. How: This shows the note's heading. */ }

						<p className={ cssModObj.notTexPar }>Write to <a className={ cssModObj.notEmaAnc } href={ `mailto:${ CON_EMA_STR }` }>{ CON_EMA_STR }</a> and we'll reply from there.</p>{ /* What: Note Text Paragraph Element. Why: Some people would rather use their own email. How: This shows the guide's address as a mail link. */ }


					</div>


				</aside>


			</div>


		</div>


	);


}

// #endregion ConPagCom

// #endregion Components



// #region Exports

export { ConPagCom }; // What: Named Export. Why: The Contact route renders this page. How: This exports ConPagCom.

// #endregion Exports


