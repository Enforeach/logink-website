<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="sm xhtml">

  <xsl:output method="html" encoding="UTF-8" indent="yes" doctype-system="about:legacy-compat"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Sitemap — Logink</title>
        <style>
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f1f5f9; color: #0f172a; line-height: 1.5; }

          header { background: #0f172a; color: #fff; padding: 20px 40px; display: flex; align-items: center; gap: 20px; border-bottom: 3px solid #818cf8; }
          .logo { font-size: 20px; font-weight: 800; letter-spacing: -0.5px; color: #818cf8; white-space: nowrap; }
          .header-text h1 { font-size: 17px; font-weight: 600; }
          .header-text p { font-size: 13px; color: #94a3b8; margin-top: 2px; }
          .header-text strong { color: #c7d2fe; }

          main { max-width: 1280px; margin: 32px auto; padding: 0 24px 48px; }

          .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,.06); }

          table { width: 100%; border-collapse: collapse; font-size: 13px; }
          thead { background: #f8fafc; border-bottom: 1px solid #e2e8f0; }
          th { padding: 11px 16px; text-align: left; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .6px; color: #64748b; white-space: nowrap; }
          td { padding: 10px 16px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
          tr:last-child td { border-bottom: none; }
          tbody tr:hover td { background: #fafbff; }

          td.url a { color: #4f46e5; text-decoration: none; word-break: break-all; }
          td.url a:hover { text-decoration: underline; }
          td.center { text-align: center; }
          td.date { color: #64748b; white-space: nowrap; font-variant-numeric: tabular-nums; }

          .badge { display: inline-block; padding: 2px 9px; border-radius: 99px; font-size: 11px; font-weight: 600; }
          .green  { background: #dcfce7; color: #15803d; }
          .yellow { background: #fef9c3; color: #92400e; }
          .gray   { background: #f1f5f9; color: #475569; }
        </style>
      </head>
      <body>
        <header>
          <div class="logo">Logink</div>
          <div class="header-text">
            <h1>XML Sitemap</h1>
            <p>This sitemap lists <strong><xsl:value-of select="count(sm:urlset/sm:url)"/> URLs</strong> indexed for search engines.</p>
          </div>
        </header>
        <main>
          <div class="card">
            <table>
              <thead>
                <tr>
                  <th>URL</th>
                  <th style="width:90px">Priority</th>
                  <th style="width:120px">Change Freq</th>
                  <th style="width:120px">Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sm:urlset/sm:url">
                  <xsl:sort select="sm:priority" order="descending" data-type="number"/>
                  <tr>
                    <td class="url">
                      <a href="{sm:loc}" target="_blank" rel="noopener">
                        <xsl:value-of select="sm:loc"/>
                      </a>
                    </td>
                    <td class="center">
                      <xsl:variable name="p" select="number(sm:priority)"/>
                      <xsl:choose>
                        <xsl:when test="$p >= 0.8">
                          <span class="badge green"><xsl:value-of select="sm:priority"/></span>
                        </xsl:when>
                        <xsl:when test="$p >= 0.5">
                          <span class="badge yellow"><xsl:value-of select="sm:priority"/></span>
                        </xsl:when>
                        <xsl:otherwise>
                          <span class="badge gray"><xsl:value-of select="sm:priority"/></span>
                        </xsl:otherwise>
                      </xsl:choose>
                    </td>
                    <td class="center">
                      <span class="badge gray"><xsl:value-of select="sm:changefreq"/></span>
                    </td>
                    <td class="date">
                      <xsl:value-of select="substring(sm:lastmod, 1, 10)"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
        </main>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
