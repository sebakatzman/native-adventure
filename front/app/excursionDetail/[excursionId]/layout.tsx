export default function ExcursionDetailLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block text-center justify-center max-w-screen-lg mx-auto p-4">
				{children}
			</div>
		</section>
	);
}
