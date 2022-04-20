import type { NextApiRequest, NextApiResponse } from "next";

export default (_: NextApiRequest, res: NextApiResponse) => {
  res.clearPreviewData();

  // Redirect the user back to the index page. Normally, you'd redirect them to
  // a `next`-URL query parameter or from other state.
  res.writeHead(307, { Location: "/" });
  res.end();
};
