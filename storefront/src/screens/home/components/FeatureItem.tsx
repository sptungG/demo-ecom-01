import React from "react";

interface FeatureItemProps {
	icon: React.ReactNode;
	title: string;
	description: string;
}

export const FeatureItem = ({ icon, title, description }: FeatureItemProps) => {
	return (
		<div className="text-center">
			<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900">
				{icon}
			</div>
			<h3 className="mt-4 text-lg font-semibold text-neutral-900">{title}</h3>
			<p className="mt-2 text-sm text-neutral-600">{description}</p>
		</div>
	);
};