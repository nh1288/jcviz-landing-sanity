/**
 * Studio layout — bypasses the public site shell.
 *
 * The Studio renders its own full-screen UI. We just pass children through;
 * the html+body wrapper from app/layout.tsx is enough.
 */

export const metadata = {
	title: 'JCVIZ Landing Studio',
	robots: {
		index: false,
		follow: false,
	},
};

export default function StudioLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
