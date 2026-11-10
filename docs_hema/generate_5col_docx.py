import os
import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

def create_client_intake_document(output_path):
    doc = Document()
    
    # Page Setup: Standard Letter, 0.65 in margins for maximum readable table space
    for section in doc.sections:
        section.top_margin = Inches(0.65)
        section.bottom_margin = Inches(0.65)
        section.left_margin = Inches(0.65)
        section.right_margin = Inches(0.65)
        section.page_width = Inches(8.5)
        section.page_height = Inches(11.0)
    
    # Footer
    footer = doc.sections[0].footer
    f_p = footer.paragraphs[0]
    f_p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    f_run = f_p.add_run("BHTCC Website Development — Client Information Gathering & Technical Intake Form")
    f_run.font.name = "Arial"
    f_run.font.size = Pt(8.5)
    f_run.font.color.rgb = RGBColor(120, 120, 120)
    
    def set_cell_background(cell, hex_color):
        tc_pr = cell._tc.get_or_add_tcPr()
        shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
        tc_pr.append(shd)

    def set_cell_margins(cell, top=90, bottom=90, left=100, right=100):
        tc_pr = cell._tc.get_or_add_tcPr()
        tc_mar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
        tc_pr.append(tc_mar)

    def set_table_borders(table, color="DCD6CD", sz="4"):
        tblPr = table._tbl.tblPr
        borders = parse_xml(
            f'<w:tblBorders {nsdecls("w")}>'
            f'<w:top w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
            f'<w:left w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
            f'<w:bottom w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
            f'<w:right w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
            f'<w:insideH w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
            f'<w:insideV w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
            f'</w:tblBorders>'
        )
        tblPr.append(borders)

    # Typography Helpers
    def add_title(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(2)
        r = p.add_run(text)
        r.bold = True
        r.font.name = "Arial"
        r.font.size = Pt(20)
        r.font.color.rgb = RGBColor(107, 29, 47) # Deep temple maroon
        return p

    def add_subtitle(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(10)
        r = p.add_run(text)
        r.font.name = "Arial"
        r.font.size = Pt(10.5)
        r.font.color.rgb = RGBColor(184, 134, 11) # Warm gold
        return p

    def make_callout(text, title="INSTRUCTIONS FOR CLIENT / COMMITTEE:"):
        tbl = doc.add_table(rows=1, cols=1)
        tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
        tbl.autofit = False
        cell = tbl.cell(0, 0)
        cell.width = Inches(7.2)
        set_cell_background(cell, "FAF6F0")
        set_cell_margins(cell, top=120, bottom=120, left=150, right=150)
        
        tc_pr = cell._tc.get_or_add_tcPr()
        borders = parse_xml(f'<w:tcBorders {nsdecls("w")}><w:left w:val="single" w:sz="24" w:space="0" w:color="800000"/><w:top w:val="none"/><w:right w:val="none"/><w:bottom w:val="none"/></w:tcBorders>')
        tc_pr.append(borders)
        
        p = cell.paragraphs[0]
        p.paragraph_format.space_before = Pt(2)
        p.paragraph_format.space_after = Pt(2)
        r1 = p.add_run(f"{title} ")
        r1.bold = True
        r1.font.color.rgb = RGBColor(107, 29, 47)
        r1.font.name = "Arial"
        r1.font.size = Pt(9.5)
        r2 = p.add_run(text)
        r2.font.name = "Arial"
        r2.font.size = Pt(9.5)
        r2.font.color.rgb = RGBColor(60, 60, 60)
        doc.add_paragraph().paragraph_format.space_after = Pt(4)

    def add_section_header(num, text, desc=""):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(14)
        p.paragraph_format.space_after = Pt(2 if desc else 5)
        p.paragraph_format.keep_with_next = True
        r = p.add_run(f"Section {num}: {text}")
        r.bold = True
        r.font.name = "Arial"
        r.font.size = Pt(11.5)
        r.font.color.rgb = RGBColor(107, 29, 47)
        
        if desc:
            p_desc = doc.add_paragraph()
            p_desc.paragraph_format.space_before = Pt(0)
            p_desc.paragraph_format.space_after = Pt(5)
            p_desc.paragraph_format.keep_with_next = True
            r_desc = p_desc.add_run(desc)
            r_desc.font.name = "Arial"
            r_desc.font.size = Pt(8.5)
            r_desc.font.italic = True
            r_desc.font.color.rgb = RGBColor(100, 100, 100)

    def create_5col_table(rows_data):
        headers = [
            "Field ID & Requirement",
            "Current Site Reference",
            "Client Input [FILLABLE]",
            "Image / PDF Upload Option [ATTACH]",
            "Developer Guidance / Format"
        ]
        table = doc.add_table(rows=len(rows_data) + 1, cols=5)
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        table.autofit = False
        set_table_borders(table, color="DCD6CD", sz="4")
        
        # Total: 1.25 + 1.35 + 2.05 + 1.35 + 1.20 = 7.20 inches
        col_widths = [Inches(1.25), Inches(1.35), Inches(2.05), Inches(1.35), Inches(1.20)]
        
        hdr_cells = table.rows[0].cells
        for i, header_text in enumerate(headers):
            cell = hdr_cells[i]
            cell.width = col_widths[i]
            set_cell_background(cell, "6B1D2F")
            set_cell_margins(cell, top=100, bottom=100, left=90, right=90)
            p = cell.paragraphs[0]
            p.paragraph_format.space_before = Pt(0)
            p.paragraph_format.space_after = Pt(0)
            run = p.add_run(header_text)
            run.bold = True
            run.font.name = "Arial"
            run.font.size = Pt(8.0)
            run.font.color.rgb = RGBColor(255, 255, 255)
        
        trPr = table.rows[0]._tr.get_or_add_trPr()
        trPr.append(parse_xml(f'<w:tblHeader {nsdecls("w")}/>'))
        
        for r_idx, row_data in enumerate(rows_data):
            row_cells = table.rows[r_idx + 1].cells
            bg_color = "FFFFFF" if r_idx % 2 == 0 else "FAF8F5"
            
            # Format row data into 5 elements
            if len(row_data) == 5:
                cells_content = row_data
            elif len(row_data) == 4:
                req_name = row_data[0]
                guide = row_data[3]
                # Generate intelligent upload option
                lower_context = (req_name + " " + guide).lower()
                if any(w in lower_context for w in ["pdf", "document", "constitution", "policy", "report", "certificate", "deed", "brochure", "guideline", "standards"]):
                    upload_str = "[  ] PDF Document Attached\n[  ] Scanned Copy Attached\nFile: [_________________]"
                elif any(w in lower_context for w in ["logo", "photo", "image", "blueprint", "render", "elevation", "picture", "avatar", "crest", "banner"]):
                    upload_str = "[  ] High-Res Photo Attached\n[  ] Vector / SVG Attached\nFile: [_________________]"
                elif any(w in lower_context for w in ["samagri", "rate", "menu", "schedule", "pricing", "form", "rules", "checklist"]):
                    upload_str = "[  ] Samagri / Rate PDF Attached\n[  ] Flyer / Photo Attached\nFile: [_________________]"
                else:
                    upload_str = "[  ] Image / PDF Attached\nFile: [_________________]"
                cells_content = [row_data[0], row_data[1], row_data[2], upload_str, row_data[3]]
            else:
                cells_content = list(row_data) + [""] * (5 - len(row_data))

            for c_idx, cell_value in enumerate(cells_content):
                cell = row_cells[c_idx]
                cell.width = col_widths[c_idx]
                set_cell_background(cell, bg_color)
                set_cell_margins(cell, top=70, bottom=70, left=90, right=90)
                p = cell.paragraphs[0]
                p.paragraph_format.space_before = Pt(0)
                p.paragraph_format.space_after = Pt(0)
                
                run = p.add_run(cell_value)
                run.font.name = "Arial"
                if c_idx == 0:
                    run.bold = True
                    run.font.size = Pt(8.0)
                    run.font.color.rgb = RGBColor(107, 29, 47)
                elif c_idx == 1:
                    run.font.size = Pt(8.0)
                    run.font.color.rgb = RGBColor(70, 70, 70)
                elif c_idx == 2:
                    run.font.size = Pt(8.0)
                    run.font.color.rgb = RGBColor(0, 51, 102) # Blue for fillable
                elif c_idx == 3:
                    run.font.size = Pt(7.8)
                    run.font.color.rgb = RGBColor(180, 83, 9) # Amber for uploads
                else:
                    run.font.size = Pt(7.8)
                    run.font.color.rgb = RGBColor(80, 80, 80)
        
        doc.add_paragraph().paragraph_format.space_after = Pt(6)

    # ------------------ DOCUMENT CONTENT ------------------
    add_title("BALLARAT HINDU TEMPLE & CULTURAL CENTRE (BHTCC)")
    add_subtitle("Official Client Information Gathering Workbook & Technical Intake Specification (Production Edition)")

    make_callout(
        "Please review this master intake document to supply official information, copy, policies, financial accounts, and consecrated assets needed to complete the BHTCC web platform. "
        "A dedicated column [Image / PDF Upload Option] has been integrated across all tables so you can reference attached photos, certificates, masterplans, and policy PDFs. "
        "Section 7 has been thoroughly filled with all traditional Agamic rituals, priest services, home blessings, rates, and samagri protocols offered by the temple.",
        title="INSTRUCTIONS FOR CLIENT & MANAGEMENT COMMITTEE:"
    )

    # SECTION 1
    add_section_header("1", "General Organization, Legal & Institutional Profile", "Establishes legal identity, tax exemptions, and official communications.")
    create_5col_table([
        ("Temple Official Name", "Ballarat Hindu Temple & Cultural Centre Incorporated", "[_______________________________________]", "[  ] Cert of Incorporation Attached\nFile: [_________________]", "Exact legal registered name as per Consumer Affairs Victoria."),
        ("Acronym / Short Form", "BHTCC", "[_______________________________________]", "[  ] Acronym Logo / SVG Attached\nFile: [_________________]", "Used for logos, mobile navbar, badges, and headers."),
        ("Legal Entity Type", "Incorporated Association (Victoria, Australia)", "[  ] Incorporated Association (Victoria)\n[  ] Company Limited by Guarantee\n[  ] Other: [__________________________]", "[  ] Constitution PDF Attached\nFile: [_________________]", "Determines terms, constitution rules, and legal footer."),
        ("State Registration No.", "Victorian Association Registration Number", "Reg No: [_______________________________]", "[  ] CAV Registration Notice Attached\nFile: [_________________]", "Appears on government grant applications and disclosures. e.g. A0100234M"),
        ("ABN (Business Number)", "13 397 829 440", "[_______________________________________]", "[  ] ABR Certificate Attached\nFile: [_________________]", "11-digit Australian Business Number. Verified on ABN Lookup."),
        ("Charity & Tax Status", "Registered Charity / Not-for-Profit (Advancement of Religion / Community Support)", "[  ] Registered with ACNC\n[  ] DGR Item 1 Endorsed\n[  ] DGR Item 2 Endorsed\n[  ] NFP Exempt", "[  ] ACNC Charity Cert Attached\n[  ] ATO DGR Endorsement PDF\nFile: [_________________]", "Governs tax deductibility wording on donation checkouts."),
        ("Physical Site Address", "110 Vaggs Rd, Ross Creek VIC 3351", "[_______________________________________]\nSuburb: [___________] State: [___] Postcode: [____]", "[  ] Title Deed / Survey Map Attached\nFile: [_________________]", "Location of the 5-acre temple property."),
        ("Postal / Office Address", "110 Vaggs Rd, Ross Creek VIC 3351", "[_______________________________________]\n[  ] Same as Physical Site Address", "[  ] Council Rate Notice Attached\nFile: [_________________]", "For legal notices, billing, and postal mail."),
        ("Local Council (LGA)", "Golden Plains Shire Council (bordering City of Ballarat)", "[_______________________________________]", "[  ] Planning Permit Copy Attached\nFile: [_________________]", "Required for council permits, parking codes, and local links."),
        ("Public Contact Phone", "+61 3 5300 0000", "[_______________________________________]", "[  ] Telco Bill Verification Attached\nFile: [_________________]", "Primary landline / mobile displayed in site header and footer."),
        ("Public Contact Email", "info@ballarathindutemple.org.au", "[_______________________________________]", "[  ] Domain MX Record Verification\nFile: [_________________]", "Primary public enquiry email inbox."),
        ("Emergency / Priest Direct Phone", "Not specified on current site", "[_______________________________________]", "[  ] Priest Mobile Directory Attached\nFile: [_________________]", "Mobile number for urgent bereavement or crisis support.")
    ])

    # SECTION 2
    add_section_header("2", "Domain, DNS & Web Hosting Infrastructure", "CRITICAL TECHNICAL REQUIREMENTS (Not visible on current prototype site).")
    create_5col_table([
        ("Primary Domain Name", "ballarathindutemple.org.au (Assumed)", "Primary Domain: [_______________________]\nAdditional Domains: [_____________________]", "[  ] Domain Ownership Cert Attached\nFile: [_________________]", "Production web address for public launch."),
        ("Domain Registrar Account", "Not specified (Netlify staging used currently)", "Registrar: [  ] VentraIP  [  ] CrazyDomains\n[  ] GoDaddy  [  ] Other: [___________]\nAccount Email: [_________________________]", "[  ] Registrar Invoice / Screenshot\nFile: [_________________]", "Access needed for DNS A-record and CNAME configuration."),
        ("DNS Hosting / Management", "Not specified", "[  ] Cloudflare  [  ] Registrar Default\n[  ] Route53  [  ] Other: [______________]", "[  ] DNS Zone File Export Attached\nFile: [_________________]", "Needed to configure SSL, CDN, and email authentication (DKIM/SPF)."),
        ("Official Devotee Email Accounts", "info@ballarathindutemple.org.au", "[  ] Google Workspace for Nonprofits\n[  ] Microsoft 365 Non-Profit Grant\n[  ] cPanel Webmail  [  ] Not set up yet", "[  ] Email System Screenshot / Setup\nFile: [_________________]", "Professional branded email addresses for committee members."),
        ("Current Codebase Hosting", "Netlify (Prototype staging)", "[  ] GitHub Organization  [  ] GitLab\n[  ] Bitbucket  [  ] Agency Server", "[  ] Repo Architecture Diagram\nFile: [_________________]", "Version control repository for production continuous deployment.")
    ])

    # SECTION 3
    add_section_header("3", "Branding, Visual Identity & Creative Assets", "Design guidelines to ensure authentic cultural aesthetics and brand consistency.")
    create_5col_table([
        ("Temple Master Logo", "Text emblem with OM symbol in header", "Logo Status: [  ] Final Vector Available\n[  ] PNG Only  [  ] Needs Refinement\nFavicon: [  ] Yes  [  ] Design Needed", "[  ] Master Vector Logo (AI/SVG/EPS)\n[  ] Transparent PNG (Dark & Light)\nFile: [_________________]", "Vector file preferred (SVG/AI/EPS) with transparent background."),
        ("Primary Color Palette", "Traditional Maroon (#7E1C27) & Sacred Gold (#C5A059)", "Primary Color 1: [  ] Keep Maroon / Hex: [___]\nAccent Color: [  ] Keep Temple Gold / Hex: [___]\nBackgrounds: [  ] Warm Ivory  [  ] Pure White", "[  ] Brand Style Guide PDF Attached\n[  ] Color Swatch Board Attached\nFile: [_________________]", "Brand color definitions ensuring WCAG AAA accessibility compliance."),
        ("Typography Preference", "Cinzel (Headings) + Plus Jakarta Sans (Body)", "[  ] Keep Cinzel & Plus Jakarta Sans\n[  ] Playfair Display  [  ] Custom: [_________]", "[  ] Font License / File Attached\nFile: [_________________]", "Google Fonts preferred for optimal mobile web performance."),
        ("Authentic Temple Photography", "Mixture of prototype renders & high-res shots", "[  ] Consecrated site photos ready\n[  ] Groundbreaking photos ready\n[  ] Deity pictures ready", "[  ] Cloud Storage Drive Link / ZIP\n[  ] High-Res Photography Archive\nFile: [_________________]", "High-resolution real site photography enhances community credibility."),
        ("Deity Iconography", "Living Altar Deepam, Bell, Flower SVG Icons", "[  ] Keep Authentic Agamic Line Icons\n[  ] Provide Custom Murti Line Artwork", "[  ] Custom Deity Line Art Vector\nFile: [_________________]", "Authentic icon style avoiding generic stock graphics.")
    ])

    # SECTION 4
    add_section_header("4", "Payment Gateways, Banking & Financial Operations", "CRITICAL TECHNICAL REQUIREMENTS for processing live donations, sponsorships, and memberships.")
    create_5col_table([
        ("Primary Payment Gateway", "Stripe (Simulated in prototype)", "[  ] Stripe Australia (Recommended)\n[  ] Square  [  ] PayPal for Non-Profits\n[  ] CommBank BPOINT / NAB Transact", "[  ] Stripe Merchant Verification\n[  ] Bank Account Confirmation Letter\nFile: [_________________]", "Stripe supports Apple Pay, Google Pay, and recurring pledges."),
        ("Direct Bank Deposit (EFT)", "Not published on current site", "Bank Name: [____________________________]\nAccount Name: [__________________________]\nBSB: [___-___] Account No: [_____________]", "[  ] Voided Cheque / Bank Statement\nFile: [_________________]", "Displayed on checkout for donors preferring direct wire transfers."),
        ("DGR Tax Receipting Details", "Basic simulated email notice", "Tax Receipt Prefix: [e.g. BHTCC-2026-]\nAuthorized Signatory Name: [______________]\nSignatory Role: [Public Officer / Treasurer]", "[  ] Signatory Signature Image (PNG)\n[  ] Official DGR Receipt Template PDF\nFile: [_________________]", "Australian tax law requires serialized receipt numbers and signature."),
        ("Multi-Currency Support", "AUD ($) baseline with currency switcher", "[  ] AUD Only  [  ] AUD + USD + INR + GBP\nExchange Rate: [  ] Live API  [  ] Fixed Rates", "[  ] FX Rate Strategy Memo\nFile: [_________________]", "Enables overseas diaspora devotees to contribute smoothly.")
    ])

    # SECTION 5
    add_section_header("5", "Temple Operational Timings, Etiquette & Facility Hire", "Operational details essential for visitor experience (Currently missing from web prototype).")
    create_5col_table([
        ("Daily Darshan Hours", "06:00 AM - 09:00 PM listed on telemetry bar", "Morning Hours: [____ AM] to [____ AM]\nEvening Hours: [____ PM] to [____ PM]\nWeekend Hours: [____ AM] to [____ PM]", "[  ] Sanctum Schedule Poster PDF\nFile: [_________________]", "Displayed in header banner, Google Maps profile, and contact page."),
        ("Daily Aarti Timetable", "Morning Suprabhatam (7 AM) to Shayan Aarti (8:30 PM)", "Suprabhatam: [____ AM]  Madhyahna: [____ PM]\nSayaratchai: [____ PM]  Shayan: [____ PM]", "[  ] Detailed Aarti Timetable PDF\nFile: [_________________]", "Fixed ritual schedule for devotees attending in person or online."),
        ("Temple Etiquette & Dress Code", "Modest traditional attire guidelines", "[x] Remove footwear at entrance\n[x] Modest attire covering shoulders & knees\n[x] Silence mobile phones in sanctum", "[  ] Etiquette Infographic Poster PDF\nFile: [_________________]", "Crucial guidance for first-time visitors and multicultural school groups."),
        ("Community Hall Hire Policy", "Facility hire mentioned on campus masterplan", "Hall Capacity: [____ Persons]\nCommercial Hire Rate: [$____ / Hour]\nCommunity NFP Rate: [$____ / Hour]\nCleaning Bond Deposit: [$____]", "[  ] Hall Floorplan Layout Attached\n[  ] Hall Hire Agreement Contract PDF\nFile: [_________________]", "Governs private bookings for weddings, naming ceremonies, and cultural events.")
    ])

    # SECTION 6
    add_section_header("6", "Spiritual Shrines, Enshrined Deities & Sacred Hierarchy", "Details the religious lineage, primary sanctum, and ritual schedules.")
    create_5col_table([
        ("Primary Presiding Deity (Moolasthanam)", "Lord Shiva / Maha Vishnu (Vedic flagship)", "Moolasthanam Deity Name: [________________]\nAgamic Tradition: [  ] Shaiva  [  ] Vaishnava\n[  ] Smartha (Panchayatana)  [  ] Ecumenical", "[  ] Deity Murti Reference Photo\n[  ] Sthala Purana Document PDF\nFile: [_________________]", "Governs temple architecture, sanctum layout, and primary pujas."),
        ("Consecrated Parivara Devatas (Shrines)", "Lord Ganesha, Sri Venkateswara, Devi Durga, Lord Murugan, Sri Hanuman, Navagrahas", "[  ] Lord Ganesha (Vighnaharta)\n[  ] Sri Venkateswara Balaji\n[  ] Devi Durga / Parvati / Lakshmi\n[  ] Lord Murugan (Kartikeya)\n[  ] Sri Hanuman (Veer Anjaneya)\n[  ] Navagraha Shrine (9 Planets)", "[  ] Sub-Shrine Architectural Drawings\n[  ] Shrine Murti Photos Archive\nFile: [_________________]", "Dedicated shrine sections on website with stotrams and photo gallery."),
        ("Sacred Agamic Lineage", "Agamic traditions meeting digital innovation", "Specific Agama: [  ] Kamika Agama\n[  ] Pancharatra Agama  [  ] Vaikhanasa\n[  ] General Smartha Vedic Traditions", "[  ] Agamic Consecration Certificate\nFile: [_________________]", "Builds immense trust with orthodox community elders and Vedic donors.")
    ])

    # SECTION 7 - FULL SERVICES THEY OFFER (EXPANDED TO 16 COMPREHENSIVE SERVICES)
    add_section_header("7", "Services They Offer: Priest Services, Home Blessings & Booking Workflow", 
                       "COMPREHENSIVE CATALOG OF SACRED SERVICES, HOMAMS, AND CEREMONIES OFFERED TO DEVOTEES ACROSS REGIONAL VICTORIA.")
    create_5col_table([
        ("Temple Altar Archana & Pushpanjali", 
         "Listed on prototype site ($51 AUD)", 
         "Suggested Dakshina: [$_____ AUD (e.g. $21 - $51)]\nFrequency: [  ] Daily  [  ] Festival Days  [  ] Walkup\nItems Provided: [x] Flowers  [x] Coconut  [x] Camphor Aarti  [x] Kumkum", 
         "[  ] Archana Altar Photo Attached\n[  ] Archana Rate Card PDF Attached\nFile: [_________________]", 
         "Daily personal or family blessing performed in front of the Garbhagriha altar."),

        ("Ganapathi Homam / Grihapravesham (Housewarming)", 
         "Housewarming & new business fire ritual ($75 - $151)", 
         "Suggested Dakshina: [$_____ AUD]\nDuration: [e.g. 2.5 - 3 Hours]\nLocation: [  ] Devotee Home  [  ] Temple Homa Shala\nPooja Samagri: [  ] Devotee purchases  [  ] Priest brings kit", 
         "[  ] Ganapathi Homa Photo Attached\n[  ] Grihapravesh Samagri PDF Attached\nFile: [_________________]", 
         "Most requested Vedic home ceremony for new property buyers in regional Victoria."),

        ("Sri Satyanarayana Swamy Vratam & Katha", 
         "Full-moon family prayer ceremony", 
         "Suggested Dakshina: [$_____ AUD]\nDuration: [e.g. 2 - 2.5 Hours]\nLanguages: [  ] Sanskrit  [  ] Telugu  [  ] Tamil  [  ] Hindi  [  ] English\nPrasadam: [x] Rava Sheera Prasadam preparation guidelines", 
         "[  ] Satyanarayana Photo Attached\n[  ] Vratam Katha Book / PDF Attached\nFile: [_________________]", 
         "Traditional thanksgiving prayer performed on Pournami (Full Moon) and milestone events."),

        ("Sri Venkateswara Divya Kalyanotsavam", 
         "Celestial wedding ritual of Lord Balaji & Padmavati ($151)", 
         "Suggested Dakshina: [$_____ AUD]\nSchedule: [  ] Shravana Saturdays  [  ] Brahmotsavam  [  ] Private Request\nInclusions: [x] Silk Angavastram  [x] Akshatas  [x] Laddu Prasadam Box", 
         "[  ] Kalyanotsavam Setup Photo\n[  ] Kalyanotsavam Flyer PDF Attached\nFile: [_________________]", 
         "High-demand festive wedding seva attracting devotees from Ballarat and Melbourne."),

        ("Maha Rudrabhishekam (108 Bilva Patra)", 
         "Sanctum Shiva Lingam abhishekam ($51 - $101)", 
         "Suggested Dakshina: [$_____ AUD]\nSchedule: [  ] Pradosham  [  ] Masa Shivaratri  [  ] Mondays\nItems: [x] Milk  [x] Honey  [x] Curd  [x] Ghee  [x] Bilva Leaves  [x] Bhasma", 
         "[  ] Shiva Lingam Photo Attached\n[  ] Rudram Chanting Guide PDF\nFile: [_________________]", 
         "Panchamrita abhishekam chanting Sri Rudram Chamakam for health and peace."),

        ("Sri Lalitha Sahasranama Kumkumarchana & Chandi Homa", 
         "Divine Mother fire ritual & 1000 names ($101)", 
         "Suggested Dakshina: [$_____ AUD]\nOccasions: [  ] Fridays  [  ] Navratri 9 Days  [  ] Pournami\nInclusions: [x] Continuous chanting  [x] Kumkum Archana  [x] Yantra Talisman", 
         "[  ] Devi Murti Photo Attached\n[  ] Chandi Homa Protocol PDF\nFile: [_________________]", 
         "Protective ritual for spiritual strength, mental clarity, and negative energy warding."),

        ("Navagraha Shanti & Dosha Nivarana Homa", 
         "9 planetary deities appeasement ($125)", 
         "Suggested Dakshina: [$_____ AUD]\nIncludes: [x] 9 Grains (Navadhanya)  [x] 9 Vastra Cloths  [x] Graha Gayatris\nDevotee Input: [x] Rashi  [x] Nakshatra  [x] Birth Time & Place", 
         "[  ] Navagraha Shrine Image Attached\n[  ] Dosha Nivarana Checklist PDF\nFile: [_________________]", 
         "Astrological remedy homam to mitigate planetary afflictions and Sade Sati periods."),

        ("Sri Hanuman Sindoor Archana & 108 Chalisa Path", 
         "Tuesday/Saturday Hanuman worship ($45)", 
         "Suggested Dakshina: [$_____ AUD]\nTiming: [  ] Tuesdays  [  ] Saturdays  [  ] Hanuman Jayanti\nOfferings: [x] Sacred Sindoor  [x] Betel Leaf Garland  [x] 108 Chalisa Path", 
         "[  ] Hanuman Murti Image Attached\n[  ] Chalisa Event Brochure PDF\nFile: [_________________]", 
         "Worship invoking courage, physical vitality, protection, and obstacle destruction."),

        ("Vehicle Blessing (Vahana Pooja / Car Blessing)", 
         "Automobile consecration at temple site", 
         "Suggested Dakshina: [$_____ AUD (e.g. $51)]\nBooking: [  ] Drive-in Walkup  [  ] Scheduled Online\nRitual Elements: [x] 4 Lemons crushed  [x] Coconut broken  [x] Kumkum Swastika", 
         "[  ] Vahana Pooja Parking Bay Photo\n[  ] Vehicle Blessing Flyer PDF\nFile: [_________________]", 
         "High traffic community service blessing newly purchased cars, SUVs, and commercial vehicles."),

        ("Baby Life-Cycle Sacraments (Namakarana & Annaprashana)", 
         "Child milestone ceremonies (Samskaras)", 
         "Suggested Dakshina: [$_____ AUD]\nCeremonies Offered:\n[  ] Namakarana (Baby naming ceremony, 11th/21st day)\n[  ] Annaprashana (First solid food feeding, 6th month)\n[  ] Chaula / Mundan (First hair tonsure)", 
         "[  ] Baby Samskara Setup Photo\n[  ] Samskara Guidebook PDF Attached\nFile: [_________________]", 
         "Essential traditional Vedic child sacraments conducted at temple or devotee homes."),

        ("Education & Youth Sacraments (Vidyarambha & Upanayanam)", 
         "Learning initiation & sacred thread investiture", 
         "Suggested Dakshina: [$_____ AUD]\nCeremonies Offered:\n[  ] Vidyarambha / Aksharabhyasa (Writing first letters on rice)\n[  ] Upanayanam (Brahmopadesham sacred thread investiture)", 
         "[  ] Upanayanam Hall Photo Attached\n[  ] Upanayanam Checklist PDF\nFile: [_________________]", 
         "Formal Vedic initiation into education, Gayatri mantra, and spiritual study."),

        ("Vedic Wedding Officiation & Vivaha Samskara", 
         "Traditional marriage ceremonies at temple / venue", 
         "Suggested Dakshina / Honorarium: [$_____ AUD]\nVenue: [  ] Temple Lawn & Mandap  [  ] External Venue\nIncludes: [x] Kanyadaan  [x] Panigrahana  [x] Saptapadi (7 Steps)  [x] Agni Sakshi", 
         "[  ] Wedding Mandap Photo Attached\n[  ] Wedding Booking Terms PDF\nFile: [_________________]", 
         "Complete Agamic wedding officiation complying with traditional rites and cultural norms."),

        ("Milestone Birthday Blessings (Sashtiabdapoorthi / 80th)", 
         "60th, 70th, 75th, and 80th birthday ceremonies", 
         "Suggested Dakshina: [$_____ AUD]\nMilestones Offered:\n[  ] Sashtiabdapoorthi (60th Birthday Celebration)\n[  ] Bhimaratha Shanti (70th)  [  ] Sahasra Chandra Darshana (80th)\nInclusions: [x] Ayushya Homam  [x] Kalasha Snanam", 
         "[  ] Milestone Altar Photo Attached\n[  ] Ayushya Homa Program PDF\nFile: [_________________]", 
         "Vedic thanksgiving and health rituals honoring parents, elders, and grandparents."),

        ("Priest Travel & Regional Home Visits Policy", 
         "Traveling priest coverage for Western Victoria", 
         "Coverage Zone: [______ km from Ballarat (e.g. 100km)]\nBallarat Urban Travel: [  ] Free / Included  [  ] $____ Flat\nRegional Victoria (Geelong, Ararat, Daylesford, Melton): [$____ / km]\nOvernight Stay Terms: [_________________________________]", 
         "[  ] Travel Coverage Map Attached\n[  ] Travel Policy Document PDF\nFile: [_________________]", 
         "Covers travel arrangements, fuel reimbursement, and priest scheduling logistics."),

        ("Pooja Samagri & Supply Checklist Protocol", 
         "Lists of items required for rituals", 
         "Samagri Options:\n[  ] Devotee purchases all items using temple PDF checklist\n[  ] Priest brings complete samagri kit (Add $____ to Dakshina)\n[  ] Hybrid (Devotee brings fruits/flowers; priest brings havan items)", 
         "[  ] Master Samagri PDF Checklist\n[  ] Approved Grocery Vendor List\nFile: [_________________]", 
         "Clear downloadable samagri checklists eliminate devotee uncertainty prior to ceremonies."),

        ("Priest Booking Notice Period & Payment Terms", 
         "Online reservation and scheduling rules", 
         "Advance Notice Required: [e.g. 7 to 14 Days]\nUrgent Requests: [  ] Direct Priest WhatsApp Hotline\nBooking Deposit: [  ] $____ Non-refundable deposit  [  ] Pay on Day\nPayment Methods: [x] Stripe Online  [x] Bank Transfer  [x] Cash Dakshina", 
         "[  ] Booking Terms Agreement PDF\nFile: [_________________]", 
         "Prevents scheduling conflicts on auspicious dates (Muhurthams, festival weekends).")
    ])

    # SECTION 8
    add_section_header("8", "Architecture, Masterplan & Construction Progress", "Engineering specifications, council permits, and construction tracking data.")
    create_5col_table([
        ("Campus Masterplan Stage", "Stage 1 Consecrated • Stage 2 Capital Expansion", "Current Stage: [  ] Stage 1 Operational\n[  ] Stage 2 Construction Underway\nTarget Completion Date: [____ / 2027]", "[  ] Master Site Plan Blueprint PDF\n[  ] 3D Architectural Render (JPG)\nFile: [_________________]", "Visual graphics demonstrating 5-acre campus zoning and shrines."),
        ("Total Land Parcel & Zoning", "5.0 Acres (110 Vaggs Rd, Ross Creek)", "Exact Area: [____ Hectares / Acres]\nZoning Classification: [e.g. Rural Living / Community]\nCouncil Permit No: [_____________________]", "[  ] Planning Permit Copy Attached\n[  ] Land Title Search PDF Attached\nFile: [_________________]", "Official council permit numbers reassuring community donors."),
        ("Traditional Stone Architecture", "Hand-carved Dravidian sandstone & black granite", "Primary Stone: [  ] Indian Granite  [  ] Sandstone\nSthapati (Chief Architect): [___________________]\nArtisan Team: [________________________________]", "[  ] Stone Carving Workshop Photos\n[  ] Sthapati Elevation Drawings PDF\nFile: [_________________]", "Highlights authentic handcrafted stonework over precast concrete."),
        ("Victorian Government Capital Grants", "$900,000+ support mentioned on prototype", "Grant Program Name: [_______________________]\nAdministering Department: [e.g. Multicultural Affairs]\nGrant Milestone Status: [___________________]", "[  ] Government Grant Letter Attached\nFile: [_________________]", "Key credibility metric reinforcing state-level institutional backing.")
    ])

    # SECTION 9
    add_section_header("9", "Capital Fundraising Campaigns, Pillar Sponsorships & Donors", "Detailed breakdown of financial targets, recognition plates, and donor tiers.")
    create_5col_table([
        ("Granite Brick Sponsorship Tiers", "1 Brick ($101), 3 Bricks ($250), 5 Bricks ($500)", "Tier 1: 1 Brick [$101 AUD]\nTier 2: 3 Bricks (Pillar) [$250 AUD]\nTier 3: 5 Bricks (Wall) [$500 AUD]\nTier 4: Sanctum Stone [$1,000 AUD]\nTier 5: Gold Kalasam [$2,500 AUD]\nTier 6: Shrine Founder [$5,000 AUD]", "[  ] Brick Engraving Mockup Image\n[  ] Donor Wall Plaque Layout PDF\nFile: [_________________]", "Integrated directly with our Australian progressive tax calculator."),
        ("Total Bricks in Campaign", "4,280 of 7,000 bricks funded ($552,000 raised)", "Total Campaign Target: [7,000 Bricks / $900,000]\nCurrent Confirmed Count: [_____ Bricks]\nTotal Funds Raised to Date: [$__________ AUD]", "[  ] Campaign Audit Ledger PDF\nFile: [_________________]", "Powers the real-time crowdfunding progress bar on the homepage."),
        ("Engraving Character Limits", "Devotee / Family Name for Granite Plaque", "Maximum Characters: [e.g. 40 Characters]\nAllowed Characters: [Letters, Numbers, '&']\nLine Count: [  ] 1 Line  [  ] 2 Lines", "[  ] Sample Engraved Plaque Photo\nFile: [_________________]", "Prevents text overflow on laser-engraved granite foundation tiles."),
        ("Major Capital Benefactor Tier", "Shrine Founder / Grand Patron ($10,000+)", "Grand Patron Tier: [$10,000+ AUD]\nNaming Rights: [  ] Sub-Shrine  [  ] Main Hall\n[  ] Garden Pathway  [  ] Library / Academy", "[  ] Capital Donor Recognition PDF\nFile: [_________________]", "Exclusive tier for major philanthropists and corporate sponsors.")
    ])

    # SECTION 10
    add_section_header("10", "Membership Program, Dues & Devotee Portal", "Configuration of membership tiers, billing cycles, and member rights.")
    create_5col_table([
        ("Annual Devotee Membership", "Not currently detailed on prototype", "Annual Fee: [$____ AUD / Year]\nBenefits: [x] Full voting rights at AGM\n[x] 10% discount on priest services\n[x] Priority festive pooja tokens", "[  ] Membership Application Form PDF\nFile: [_________________]", "Encourages recurring sustainable operational funding."),
        ("Life Membership Tier", "Not currently detailed on prototype", "Life Membership Dakshina: [$______ AUD]\nFamily Coverage: [Spouse + children under 18]\nRecognition: [Listed on Annual Report / Wall]", "[  ] Life Member Certificate Layout\nFile: [_________________]", "Provides long-term endowment capital for temple maintenance."),
        ("Devotee Portal Login Requirements", "Simulated Gotra Sankalp generator", "Portal Capabilities:\n[  ] View tax donation receipts\n[  ] Manage recurring monthly pledges\n[  ] Update family Gotra/Nakshatra profile", "[  ] Portal Wireframe / Spec PDF\nFile: [_________________]", "Self-service dashboard reducing administrative workload for volunteers.")
    ])

    # SECTION 11
    add_section_header("11", "Calendar of Events, Festivals & RSVP / Ticketing System", "Information for scheduling, managing, and ticketing major community festivals.")
    create_5col_table([
        ("Major Annual Hindu Festivals", "Diwali, Mahashivaratri, Ganesh Chaturthi, Navratri", "Festivals Celebrated:\n[x] Maha Shivaratri (All-night Jagaran)\n[x] Sri Rama Navami & Sita Kalyanam\n[x] Krishna Janmashtami\n[x] Ganesh Chaturthi Festival\n[x] Navratri 9 Days & Vijayadashami\n[x] Deepavali (Diwali Annakut & Fireworks)", "[  ] Festival Calendar Poster PDF\n[  ] Festival Photography Archive\nFile: [_________________]", "Interactive calendar on events page with RSVP and prasad counters."),
        ("Festival Food Stalls & Annadanam", "Free prasad distribution + food stalls", "Food Model: [  ] Free Annadanam for all\n[  ] Dedicated food stalls by volunteers\nFood Safety Supervisor WWCC: [Verified]", "[  ] Food Safety Permit Certificate\nFile: [_________________]", "Ensures compliance with Golden Plains Shire food safety regulations."),
        ("Parking & Traffic Management", "On-site parking at 110 Vaggs Rd", "Car Parking Capacity: [_____ Vehicles]\nOverflow Parking: [  ] Paddock Area\nTraffic Wardens: [  ] Volunteer team", "[  ] Traffic Management Plan PDF\nFile: [_________________]", "Crucial logistics for major festivals attracting 1,000+ regional devotees.")
    ])

    # SECTION 12
    add_section_header("12", "Community Programs, Educational Classes & Welfare Outreach", "Schedules, instructor details, and enrollment workflows for cultural and welfare services.")
    create_5col_table([
        ("Yoga & Pranayama Sessions", "Weekly Saturday morning classes", "Schedule: Every Saturday, 8:30 AM - 10:00 AM\nInstructor: [Qualified Yoga Master]\nFee: [  ] Free Community Class  [  ] $____", "[  ] Yoga Class Flyer / Photo\nFile: [_________________]", "Health and wellness initiative open to the wider Australian public."),
        ("Sanskrit & Cultural Academy", "Sunday classes for diaspora youth", "Schedule: Every Sunday, 2:00 PM - 4:00 PM\nSubjects: [x] Sanskrit Grammar  [x] Stotrams\n[x] Indian Classical Music  [x] Bharatanatyam", "[  ] Academy Syllabus Document PDF\nFile: [_________________]", "Preserving ancestral heritage and linguistic culture for regional youth."),
        ("Senior Citizens Social Circle", "Fortnightly fellowship & bhajans", "Schedule: Fortnightly Wednesdays, 11 AM - 1 PM\nActivities: [x] Bhajans  [x] Spiritual Discourse\n[x] Free Sattvic Vegetarian Lunch", "[  ] Seniors Fellowship Photo\nFile: [_________________]", "Combats social isolation among elderly multicultural residents in Ballarat."),
        ("Emergency Food Relief & Drives", "Monthly dry-ration food collection", "Distribution Partners:\n[x] Ballarat Emergency Food Relief Shelters\n[x] Disadvantaged regional families\nItems: Rice, flour, lentils, oil, hygiene kits", "[  ] Food Drive Report / Photo\nFile: [_________________]", "Tangible charity fulfilling Australian DGR Item 1 public benefit purpose.")
    ])

    # SECTION 13
    add_section_header("13", "Volunteer Management, Roles & WWCC Compliance", "Framework for recruiting, coordinating, and legally vetting community volunteers.")
    create_5col_table([
        ("Working with Children Check (WWCC)", "Mandatory Victorian child safety compliance", "Compliance Requirement: [MANDATORY]\nVerification Method: [Online WWCC Status Check]\nChild Safety Officer: [_______________________]", "[  ] Child Safety Policy Document PDF\nFile: [_________________]", "Strict legal requirement under Victoria's Child Safe Standards."),
        ("Volunteer Streams & Functional Areas", "7 areas listed on existing website", "Streams Offered:\n[x] Festival & Event Logistics\n[x] Temple Kitchen & Annadanam Service\n[x] Landscape, Tulsi Gardens & Site Cleanups\n[x] Cultural Academy Teaching & Tutoring\n[x] IT, Social Media & Digital Photography\n[x] Fundraising, Grants & Accounting", "[  ] Volunteer Application Form PDF\nFile: [_________________]", "Allows community members to register based on their specific skills."),
        ("Volunteer Agreement & Code of Conduct", "volunteer-code-of-conduct.pdf", "[  ] Standard BHTCC Code of Conduct\n[  ] Annual Volunteer Induction Briefing", "[  ] Code of Conduct Document PDF\nFile: [_________________]", "Protects organization against liability and establishes behavioral standards.")
    ])

    # SECTION 14
    add_section_header("14", "Committee Members, Key Personnel & Role-Based Access Control", "Board profiles for website publication and system access permissions.")
    create_5col_table([
        ("Executive Management Committee", "President, Secretary, Treasurer, Public Officer", "President: [_____________________________]\nVice President: [_________________________]\nSecretary: [_____________________________]\nTreasurer: [_____________________________]\nPublic Officer: [_________________________]", "[  ] Committee Photos Directory (ZIP)\n[  ] Board Resolution Extract PDF\nFile: [_________________]", "Published on Governance page to establish institutional transparency."),
        ("Public Trustee / Council of Elders", "Advisory council of respected elders", "Elder Council Members: [___________________]\nSpiritual Advisors / Priests: [____________]", "[  ] Advisory Council Charter PDF\nFile: [_________________]", "Provides ethical guidance and long-term religious stewardship."),
        ("Admin Portal CMS Permissions", "Single static read-only prototype", "Role Tiers:\n[x] Super Admin (Executive Committee)\n[x] Finance Admin (Treasurer / Tax Receipts)\n[x] Priest / Pooja Coordinator (Bookings)\n[x] Event Manager (RSVPs & Volunteers)", "[  ] Role Matrix Specification PDF\nFile: [_________________]", "Ensures secure role-based access control (RBAC) across website management.")
    ])

    # SECTION 15
    add_section_header("15", "Communications, Automated Emails & SMS Gateways", "CRITICAL TECHNICAL REQUIREMENTS for automated transactional devotee communications.")
    create_5col_table([
        ("Transactional Email Delivery Service", "Simulated alert messages in prototype", "Email Gateway Provider:\n[  ] Resend (Recommended)\n[  ] SendGrid  [  ] AWS SES  [  ] Postmark", "[  ] Email Provider Setup Details\nFile: [_________________]", "Reliably delivers tax deductible receipts and puja booking confirmations."),
        ("Devotee WhatsApp Community Channel", "WhatsApp Devotee Group link in drawer", "WhatsApp Community Invite Link: [__________]\nChannel Purpose: Daily Darshan, Festivals\nModerator Mobile Number: [__________________]", "[  ] WhatsApp QR Code / Link Image\nFile: [_________________]", "Direct communication line with 500+ local regional families."),
        ("Automated Notification Types", "Tax receipt, puja confirmation, brick token", "Templates Needed:\n[x] Instant DGR Tax Deductible Receipt\n[x] Pooja Booking & Gotra Sankalp Pass\n[x] Volunteer Application Confirmation\n[x] Event RSVP QR Code Ticket", "[  ] Custom Email Copy Drafts PDF\nFile: [_________________]", "Professional transactional email notifications with PDF attachments.")
    ])

    # SECTION 16
    add_section_header("16", "SEO, Google Business, Analytics & Social Media", "Visibility and digital marketing infrastructure (Not present on prototype site).")
    create_5col_table([
        ("Google Business Profile Listing", "Ballarat Hindu Temple & Cultural Centre", "Listing Status: [  ] Claimed  [  ] Unclaimed\nExact Google Maps CID: [__________________]\nGoogle Reviews Widget Embed: [  ] Yes  [  ] No", "[  ] Google Business Screenshot\nFile: [_________________]", "Powers Google Maps navigation, opening hours, and real devotee reviews."),
        ("Official Social Media Channels", "Generic footer placeholders", "Facebook Page: [__________________________]\nInstagram Profile: [______________________]\nYouTube Channel (Live Feeds): [__________]\nLinkedIn Organization: [___________________]", "[  ] Social Media Assets Package\nFile: [_________________]", "Enables live darshan streaming and cross-platform event announcements."),
        ("Web Analytics & Privacy Compliance", "Not configured on prototype", "[  ] Google Analytics 4 (GA4)\n[  ] Privacy-Friendly Plausible / Umami\nCookie Consent Banner: [  ] Standard Australian", "[  ] Analytics Property ID Document\nFile: [_________________]", "Tracks visitor traffic while respecting privacy regulations.")
    ])

    # SECTION 17
    add_section_header("17", "Legal Compliance, Policies & Statutory Downloads", "Formal documents required for governance and regulatory compliance.")
    create_5col_table([
        ("BHTCC Model Constitution 2016", "bhtcc-constitution.pdf (Adopted 15 Aug 2016)", "Current Version Date: [15 August 2016]\nStatus: [x] Active and lodged with CAV", "[  ] bhtcc-constitution.pdf Attached\nFile: [_________________]", "Mandatory download on Governance page under Victorian law."),
        ("Child Safety Standards Policy", "child-safety-policy.pdf (Adopted 01 Oct 2025)", "Current Version Date: [01 October 2025]\nComplies with Victoria's 11 Child Safe Standards", "[  ] child-safety-policy.pdf Attached\nFile: [_________________]", "Demonstrates mandatory statutory compliance across all youth activities."),
        ("Volunteer Code of Conduct", "volunteer-code-of-conduct.pdf (10 Jan 2026)", "Current Version Date: [10 January 2026]\nSigned by all active volunteers upon onboarding", "[  ] volunteer-code-of-conduct.pdf\nFile: [_________________]", "Outlines behavioral expectations, safety, and mutual respect."),
        ("Annual Audited Financial Report", "financial-report-2025.pdf (31 Dec 2025)", "Latest Audited Year: [FY 2024 - 2025]\nAuditor Firm: [___________________________]", "[  ] financial-report-2025.pdf Attached\nFile: [_________________]", "Builds immense trust with community donors and grant funding bodies."),
        ("Privacy Policy & Terms of Website Use", "Placeholders on current prototype", "Policy Choice:\n[  ] Custom BHTCC Privacy Policy\n[  ] Standard Australian Privacy Act 1988 Model", "[  ] Privacy Policy Document PDF\nFile: [_________________]", "Required by Australian law for collecting personal and credit card data."),
        ("Acknowledgement of Country", "Wadawurrung Traditional Owners", "Custodians: Wadawurrung People of Kulin Nation\nFooter Wording: [  ] Standard BHTCC Wording\n[  ] Custom Traditional Owner Text", "[  ] Traditional Owner Statement PDF\nFile: [_________________]", "Crucial civic respect for Traditional Custodians across regional Victoria.")
    ])

    # SECTION 18
    add_section_header("18", "Future Development Roadmap & Phase 2 Wishlist", "Strategic capabilities for future expansion and technology enhancements.")
    create_5col_table([
        ("Dedicated Mobile App (iOS & Android)", "Progressive Web App (PWA) baseline", "Phase 2 Priority: [  ] High  [  ] Medium\nFeatures: Daily Darshan notifications, Panchang alerts", "[  ] Mobile App Feature Spec PDF\nFile: [_________________]", "Push notifications for Ekadashi, Pradosham, and festival dates."),
        ("Virtual Reality (VR) Sanctum Experience", "3D architectural render on masterplan", "Phase 2 Priority: [  ] High  [  ] Low\nFeatures: 360-degree immersive sanctum walk", "[  ] 360-Degree Panorama Media\nFile: [_________________]", "Allows bedridden seniors and global diaspora to experience the sanctum."),
        ("Multilingual Content Expansion", "English baseline on current website", "Languages to Add:\n[x] Tamil  [x] Telugu  [x] Hindi  [x] Gujarati\nTranslation Method: [  ] Certified Human  [  ] AI Hybrid", "[  ] Multilingual Copy Drafts (ZIP)\nFile: [_________________]", "Serves diverse non-English speaking elderly devotees across regional Victoria.")
    ])

    # SIGN-OFF BLOCK
    doc.add_page_break()
    p_sign = doc.add_paragraph()
    p_sign.paragraph_format.space_before = Pt(20)
    r_sign = p_sign.add_run("CLIENT AUTHORIZATION & AGENCY SIGN-OFF BLOCK")
    r_sign.bold = True
    r_sign.font.size = Pt(13)
    r_sign.font.color.rgb = RGBColor(107, 29, 47)
    
    make_callout(
        "By signing below, the authorized executive officers of the Ballarat Hindu Temple & Cultural Centre Inc. (BHTCC) confirm that the information, asset attachments, and services catalog detailed in this intake specification are accurate, authorized, and approved for website production deployment.",
        title="DECLARATION OF AUTHORIZATION:"
    )
    
    sign_table = doc.add_table(rows=3, cols=2)
    sign_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(sign_table, color="B8860B", sz="6")
    
    s_col_widths = [Inches(3.6), Inches(3.6)]
    labels = [
        ("Authorized Executive Officer 1 (e.g. President / Secretary):", "Authorized Executive Officer 2 (e.g. Treasurer / Public Officer):"),
        ("Full Legal Name: _________________________________", "Full Legal Name: _________________________________"),
        ("Signature & Date: _________________________________", "Signature & Date: _________________________________")
    ]
    
    for r_idx, (c1, c2) in enumerate(labels):
        row = sign_table.rows[r_idx]
        for c_idx, text in enumerate([c1, c2]):
            cell = row.cells[c_idx]
            cell.width = s_col_widths[c_idx]
            set_cell_background(cell, "FAF6F0" if r_idx == 0 else "FFFFFF")
            set_cell_margins(cell, top=100, bottom=100, left=120, right=120)
            p = cell.paragraphs[0]
            p.paragraph_format.space_before = Pt(3)
            p.paragraph_format.space_after = Pt(3)
            r = p.add_run(text)
            r.font.name = "Arial"
            r.font.size = Pt(9.5)
            if r_idx == 0:
                r.bold = True
                r.font.color.rgb = RGBColor(107, 29, 47)
            else:
                r.font.color.rgb = RGBColor(50, 50, 50)
                
    doc.save(output_path)
    print(f"Successfully generated 5-column master intake document at: {output_path}")

if __name__ == '__main__':
    out_file = r"docs_hema\BHTCC_Website_Requirements_Client_Intake.docx"
    create_client_intake_document(out_file)
