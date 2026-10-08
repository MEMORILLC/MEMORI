// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	interface ImportMetaEnv {
		readonly VITE_BUILD_ID: string;
	}

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
