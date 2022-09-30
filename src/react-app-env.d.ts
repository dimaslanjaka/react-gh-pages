/// <reference types="react-scripts" />
/// <reference types="gtag.js" />
/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />
// uncomment below library when you using some below
// / <reference types="jquery" />
// / <reference types="bootstrap" />

declare module "*.svg" {
	const content: any;
	export default content;
}

declare namespace JSX {
	interface ExtendedButton
		extends React.DetailedHTMLProps<
			React.ButtonHTMLAttributes<HTMLButtonElement>,
			HTMLButtonElement
		> {
		[key: string]: any;
		customAttribute?: string;
	}

	interface IntrinsicElements {
		[key: string]: any;
		button: ExtendedButton;
	}
}

declare namespace NodeJS {
	interface ProcessEnv {
		readonly NODE_ENV: "development" | "production" | "test";
		readonly PUBLIC_URL: string;
	}
}
