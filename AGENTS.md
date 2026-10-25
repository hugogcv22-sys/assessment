<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep `/` as the two-proposal lobby and host the original `public/walkthrough.html` at `/proposal-one` in an iframe; isolation preserves its existing sections and navigation.
- Pass Instagram and video asset URLs from the original proposal iframe's load handler through same-origin messaging; static walkthrough HTML cannot resolve Vite asset imports directly.
- Host the imported Trolley HTML, compiled stylesheet and browser script in a separate iframe at `/proposal-two`; independent documents prevent style and global-handler collisions between proposals.
- Keep imported proposal media in project-owned asset pointers and map its original image paths before rendering; source-project media paths do not resolve here.
- Keep the Instagram guides aligned across proposals; proposal two's hero guide instead follows its generated pop-art film, while proposal one retains the original campaign.
- Each hero film has its own asset pointers, WebM fallback, poster and matching beat guide; preserve seeking, replay and reduced-motion closing overlays from second 20, distinguishing web animation from the exported film. Version proposal two's stored custom-video key when replacing its campaign so an older override cannot conceal the new default.
- Keep proposal two's five defense modules aligned with proposal one's approved content; resolve its OpusClip sample URLs from shared asset pointers when assembling the iframe document so both examples remain playable.

- The Instagram example shares media pointers and five-beat timing across both isolated proposals; pass its assets by same-origin messaging for proposal one and source replacement for proposal two so static HTML never needs Vite imports.
- Keep the live app's CDN asset pointers unchanged; generate independent GitHub copies with scripts/export_github.py outside the checkout, placing media at matching public paths so exports do not depend on Lovable asset serving.
