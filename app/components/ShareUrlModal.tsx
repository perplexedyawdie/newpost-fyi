
import useClipboard from "react-use-clipboard";
import toast from 'react-hot-toast'
import {
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
    RedditShareButton,
    RedditIcon,
    TelegramShareButton,
    TelegramIcon,
} from 'next-share'

interface GeneratedURL {
    url: string;
}
function ShareUrlModal({ url }: GeneratedURL) {
    const [isCopied, setCopied] = useClipboard(url);
    function handleCopy(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.preventDefault();
        setCopied()
        toast.success("Link copied!", {
            icon: "✂"
        })
    }

    return (
        <>
            <dialog id="shareModal" className="modal modal-bottom sm:modal-middle">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg mb-8">🎊 Congratulations! 🎊</h3>
                    {/* <p>{url}</p> */}
                    <div className="join">
                        <input value={`${url}`} type="text" placeholder="Type here" className="input input-primary w-full max-w-xs join-item" />
                        <button onClick={handleCopy} className="btn join-item rounded-r-full btn-primary text-white">Copy</button>
                    </div>
                    <p className="py-4">Share anywhere:</p>
                    <div className="flex justify-center items-center space-x-2">
                        <FacebookShareButton
                            url={`${url}`}
                            hashtag={'#newpost.fyi'}
                        >
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <LinkedinShareButton url={`${url}`}>
                            <LinkedinIcon size={32} round />
                        </LinkedinShareButton>
                        <TwitterShareButton
                            url={`${url}`}
                        >
                            <TwitterIcon size={32} round />
                        </TwitterShareButton>
                        <WhatsappShareButton
                            url={`${url}`}
                            separator=":: "
                        >
                            <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                        <RedditShareButton
                            url={`${url}`}
                        >
                            <RedditIcon size={32} round />
                        </RedditShareButton>
                        <TelegramShareButton
                            url={`${url}`}
                        >
                            <TelegramIcon size={32} round />
                        </TelegramShareButton>
                    </div>
                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default ShareUrlModal