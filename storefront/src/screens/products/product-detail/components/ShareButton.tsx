"use client";
import React from "react";
import { Share2, Check, Copy, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonProps {
	className?: string;
	title?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
	className = "rounded-lg border border-gray-300 p-3 transition-colors hover:border-gray-400 hover:bg-gray-50",
	title = "Copy product link",
}) => {
	const handleCopyLink = async () => {
		try {
			const currentUrl = window.location.href;
			await navigator.clipboard.writeText(currentUrl);
			toast.success("Link Copied!", {
				description: "Product link has been copied to clipboard",
				duration: 3000,
				position: "top-center",
				icon: <Check className="h-4 w-4" />,
				className: "bg-green-50 border-green-200 text-green-800",
				style: {
					background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
					borderColor: "#bbf7d0",
					color: "#166534",
					boxShadow: "0 4px 12px rgba(34, 197, 94, 0.15)",
				},
				action: {
					label: "View",
					onClick: () => window.open(currentUrl, "_blank"),
				},
			});
		} catch (error) {
			console.error("Failed to copy link:", error);
			// Fallback for older browsers
			try {
				const textArea = document.createElement("textarea");
				textArea.value = window.location.href;
				textArea.style.position = "fixed";
				textArea.style.left = "-999999px";
				textArea.style.top = "-999999px";
				document.body.appendChild(textArea);
				textArea.focus();
				textArea.select();
				document.execCommand("copy");
				document.body.removeChild(textArea);
				toast.success("Link Copied!", {
					description: "Product link has been copied to clipboard",
					duration: 3000,
					icon: <Copy className="h-4 w-4" />,
					className: "bg-blue-50 border-blue-200 text-blue-800",
					style: {
						background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
						borderColor: "#93c5fd",
						color: "#1e40af",
						boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)",
					},
				});
			} catch (fallbackError) {
				toast.error("Copy Failed", {
					description: "Unable to copy link. Please copy manually from address bar",
					duration: 4000,
					icon: <AlertCircle className="h-4 w-4" />,
					className: "bg-red-50 border-red-200 text-red-800",
					style: {
						background: "linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)",
						borderColor: "#fca5a5",
						color: "#dc2626",
						boxShadow: "0 4px 12px rgba(239, 68, 68, 0.15)",
					},
					action: {
						label: "Retry",
						onClick: () => handleCopyLink(),
					},
				});
			}
		}
	};

	return (
		<button onClick={handleCopyLink} className={className} title={title} type="button">
			<Share2 className="h-5 w-5" />
		</button>
	);
};

export default ShareButton;
