import os
from reportlab.lib.pagesizes import letter, landscape
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib import colors

def draw_slide_decorations(canvas, doc):
    canvas.saveState()
    # Top primary blue accent bar (12pt high)
    canvas.setFillColor(colors.HexColor("#1E4E79"))
    canvas.rect(0, 600, 792, 12, fill=True, stroke=False)
    
    # Bottom light-gray accent line
    canvas.setStrokeColor(colors.HexColor("#D6D9DE"))
    canvas.setLineWidth(1)
    canvas.line(36, 45, 756, 45)
    
    # Footer text and pagination
    canvas.setFont("Helvetica-Bold", 8)
    canvas.setFillColor(colors.HexColor("#1E4E79"))
    canvas.drawString(36, 28, "DESICCANT WHEEL PERFORMANCE PREDICTOR")
    
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#6B7280"))
    canvas.drawString(280, 28, "Summer Internship Research Project | Advisor: Dr. Lakshmikant")
    canvas.drawRightString(756, 28, f"Slide {doc.page} of 7")
    canvas.restoreState()

def build_presentation_pdf(output_filename):
    # Setup document template (Landscape Letter = 792 x 612 pt)
    doc = SimpleDocTemplate(
        output_filename,
        pagesize=landscape(letter),
        leftMargin=40,
        rightMargin=40,
        topMargin=45,
        bottomMargin=60
    )
    
    styles = getSampleStyleSheet()
    
    # Custom styled text styles aligning with the calm, corporate palette
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=28,
        leading=34,
        textColor=colors.HexColor("#1E4E79"),
        alignment=1, # Centered
        spaceAfter=15
    )
    
    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor("#6B7280"),
        alignment=1,
        spaceAfter=40
    )
    
    slide_header_style = ParagraphStyle(
        'SlideHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor("#1E4E79"),
        spaceAfter=5
    )

    slide_subheading_style = ParagraphStyle(
        'SlideSubheading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=colors.HexColor("#6B7280"),
        spaceAfter=15
    )
    
    body_style = ParagraphStyle(
        'SlideBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11.5,
        leading=16,
        textColor=colors.HexColor("#2D3748"),
        spaceAfter=10
    )

    bullet_style = ParagraphStyle(
        'SlideBullet',
        parent=body_style,
        leftIndent=20,
        firstLineIndent=-10,
        spaceAfter=6
    )
    
    code_style = ParagraphStyle(
        'SlideCode',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor("#243447")
    )
    
    story = []
    
    # ----------------------------------------------------
    # SLIDE 1: Cover Page
    # ----------------------------------------------------
    story.append(Spacer(1, 100))
    story.append(Paragraph("Desiccant Wheel Performance Prediction System", title_style))
    story.append(Paragraph("MATHEMATICAL MODELING + MACHINE LEARNING SURROGATE EMULATOR", subtitle_style))
    
    # Info metadata table for cover slide
    meta_data = [
        [Paragraph("<b>Research Internship:</b>", body_style), Paragraph("Thermal Energy Systems Laboratory", body_style)],
        [Paragraph("<b>Department:</b>", body_style), Paragraph("Department of Mechanical Engineering", body_style)],
        [Paragraph("<b>Academic Advisor:</b>", body_style), Paragraph("Dr. Lakshmikant", body_style)],
        [Paragraph("<b>Software Stack:</b>", body_style), Paragraph("Vite, React, TypeScript, Tailwind CSS v4, Random Forest", body_style)]
    ]
    meta_table = Table(meta_data, colWidths=[150, 300])
    meta_table.setStyle(TableStyle([
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    
    # Wrap in centered container
    container_table = Table([[meta_table]], colWidths=[450])
    container_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#E9ECEF")),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('TOPPADDING', (0,0), (-1,-1), 15),
        ('BOTTOMPADDING', (0,0), (-1,-1), 15),
        ('LEFTPADDING', (0,0), (-1,-1), 20),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#D6D9DE")),
    ]))
    
    story.append(container_table)
    story.append(PageBreak())
    
    # ----------------------------------------------------
    # SLIDE 2: Rotary Dehumidification System Concept
    # ----------------------------------------------------
    story.append(Paragraph("1. Rotary Dehumidification Process", slide_header_style))
    story.append(Paragraph("SYSTEM CYCLE OVERVIEW AND OPERATION METHODOLOGY", slide_subheading_style))
    story.append(Spacer(1, 10))
    
    story.append(Paragraph("Rotary solid desiccant dehumidifiers continually extract moisture from an incoming air stream:", body_style))
    story.append(Paragraph("• <b>Process Air Stream (Dehumidification):</b> Wet ambient process air passes through the active sector of the slowly rotating wheel matrix. Silica gel adsorption absorbs moisture, releasing heat of adsorption. This outputs dry, warm air.", bullet_style))
    story.append(Paragraph("• <b>Regeneration Air Stream (Reactivation):</b> A secondary air stream is sensibly heated (typically 80°C - 140°C) and forced through the remaining sector. This thermal energy desorbs moisture, reactivating the silica gel.", bullet_style))
    story.append(Paragraph("• <b>Continuous Cycle:</b> The wheel rotates slowly (10 - 20 RPM depending on operational optimization targets) to constantly cycle matrix channels between adsorption and thermal desorption.", bullet_style))
    
    story.append(Spacer(1, 20))
    # Quick visual legend box
    legend_data = [
        [
            Paragraph("<b>Process Stream Inlet</b><br/>High RH (60-80%)<br/>Cool/Warm (15-35°C)", body_style),
            Paragraph("── Adsorption (Silica Gel) ──>", body_style),
            Paragraph("<b>Process Stream Outlet</b><br/>Low RH (5-15%)<br/>Hot Discharge (45-65°C)", body_style)
        ]
    ]
    legend_table = Table(legend_data, colWidths=[200, 200, 200])
    legend_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FFFFFF")),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#D6D9DE")),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(legend_table)
    story.append(PageBreak())
    
    # ----------------------------------------------------
    # SLIDE 3: Governing Physics Equations
    # ----------------------------------------------------
    story.append(Paragraph("2. Governing Physics Equations", slide_header_style))
    story.append(Paragraph("CONSERVATION LAWS AND SOLID-FLUID KINETICS", slide_subheading_style))
    story.append(Spacer(1, 10))
    
    physics_data = [
        [
            Paragraph("<b>Moisture Conservation (Mass Balance)</b>", body_style),
            Paragraph("Governs moisture transport between process air and solid matrix:<br/>"
                      "<i>v * ∂Y/∂x + ∂Y/∂t + ((1-ε)/ε) * (ρ_d/ρ_a) * ∂q/∂t = 0</i>", code_style)
        ],
        [
            Paragraph("<b>Enthalpy Conservation (Energy Balance)</b>", body_style),
            Paragraph("Governs thermal energy and heat release during adsorption:<br/>"
                      "<i>v * ∂h/∂x + ∂h/∂t + ((1-ε)/ε) * (ρ_d/ρ_a) * ∂H_d/∂t = 0</i>", code_style)
        ],
        [
            Paragraph("<b>Interphase Mass Transfer Kinetics</b>", body_style),
            Paragraph("Convective transport rate to silica-gel surfaces:<br/>"
                      "<i>ρ_d * ∂q/∂t = k_m * a_v * (Y_air - Y_eq(T_desiccant, q))</i>", code_style)
        ],
        [
            Paragraph("<b>Frictional Head Loss (Pressure Drop)</b>", body_style),
            Paragraph("Fanning resistance inside sinusoidal matrix channels:<br/>"
                      "<i>ΔP = (8 * μ * L_wheel * v) / D_hydraulic^2</i>", code_style)
        ]
    ]
    physics_table = Table(physics_data, colWidths=[240, 460])
    physics_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FFFFFF")),
        ('GRID', (0,0), (-1,-1), 1, colors.HexColor("#D6D9DE")),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(physics_table)
    story.append(PageBreak())
    
    # ----------------------------------------------------
    # SLIDE 4: Key Operational Trade-offs
    # ----------------------------------------------------
    story.append(Paragraph("3. Operational Sensitivity & Trade-offs", slide_header_style))
    story.append(Paragraph("CONFLICTING ENGINEERING PERFORMANCE METRICS", slide_subheading_style))
    story.append(Spacer(1, 10))
    
    tradeoffs_data = [
        [
            Paragraph("<b>Face Velocity Trade-off</b>", body_style),
            Paragraph("<b>High velocity</b> yields higher absolute flow rates (m³/h), but reduces contact residence time (lower NTU) which increases outlet humidity.<br/><b>Frictional Resistance:</b> Pressure drop ΔP increases linearly with velocity, scaling fan power consumption.", body_style)
        ],
        [
            Paragraph("<b>Regeneration Temp Trade-off</b>", body_style),
            Paragraph("<b>Higher temperatures</b> restore adsorption potential of silica gel, ensuring lower outlet humidity.<br/><b>Carryover Leakage:</b> Extra thermal heat is physically transferred from the regeneration sector to process sector, warming the process air and requiring supplementary cooling downstream.", body_style)
        ],
        [
            Paragraph("<b>Wheel Speed (RPM) Curve</b>", body_style),
            Paragraph("Rotational speed behaves quadratically:<br/>• <b>Too Slow:</b> Desiccant saturates quickly, stopping adsorption.<br/>• <b>Too Fast:</b> Sensible heat carryover from the regeneration heaters degrades process performance.<br/>• <b>Optimum:</b> Typically around 10 - 15 RPM for silica gel wheels.", body_style)
        ]
    ]
    tradeoffs_table = Table(tradeoffs_data, colWidths=[200, 500])
    tradeoffs_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FFFFFF")),
        ('GRID', (0,0), (-1,-1), 1, colors.HexColor("#D6D9DE")),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(tradeoffs_table)
    story.append(PageBreak())
    
    # ----------------------------------------------------
    # SLIDE 5: Legacy Issues vs Implemented Solutions
    # ----------------------------------------------------
    story.append(Paragraph("4. Core Implementation Challenges & Solutions", slide_header_style))
    story.append(Paragraph("WHAT WAS WRONG IN PREVIOUS SOFTWARE AND HOW WE FIXED IT", slide_subheading_style))
    story.append(Spacer(1, 10))
    
    comparisons = [
        [
            Paragraph("<b>Legacy Code / UI Problems</b>", body_style),
            Paragraph("<b>Our Fixed Implementation</b>", body_style)
        ],
        [
            Paragraph("<b>Thermodynamically Inconsistent:</b> Naive mock code predicted dehumidification without heating. This physically violates energy balances (adsorption is an exothermic phase-change).", body_style),
            Paragraph("<b>Psychrometric Core:</b> Programmed Tetens vapor equations. Coupled outlet state temperatures to moisture extraction rate (exhibiting realistic ~2.8°C heating per g/kg of water adsorbed).", body_style)
        ],
        [
            Paragraph("<b>Severe Visual Clutter:</b> Displaying detailed multi-line range helper texts below all 9 inputs led to heavy visual noise and massive vertical scrolling.", body_style),
            Paragraph("<b>Categorized Grid Panels:</b> Grouped inputs into 3 logical areas. Range boundaries were shifted directly inside labels (e.g. <i>Inlet Temp (15–45)</i>). Saved 50% form height.", body_style)
        ],
        [
            Paragraph("<b>Non-Interactive Plotting:</b> Static chart images that failed to capture actual physical sensitivities around the researcher's inputs.", body_style),
            Paragraph("<b>Dynamic Parameter Sweeps:</b> Sweeps are generated on the fly. Chart.js automatically plots dual-Y-axes sensitivity curves (Velocity vs. ΔP, and Regen Temp vs. Outlet RH/T) upon submission.", body_style)
        ]
    ]
    comp_table = Table(comparisons, colWidths=[340, 360])
    comp_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#E9ECEF")),
        ('GRID', (0,0), (-1,-1), 1, colors.HexColor("#D6D9DE")),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(comp_table)
    story.append(PageBreak())
    
    # ----------------------------------------------------
    # SLIDE 6: Software Architecture & ML Surrogate
    # ----------------------------------------------------
    story.append(Paragraph("5. Software Architecture & ML Model", slide_header_style))
    story.append(Paragraph("FRONTEND SYSTEM STACK AND SURROGATE PREDICTION METRICS", slide_subheading_style))
    story.append(Spacer(1, 10))
    
    system_text = (
        "The project is compiled into a lightweight client-side React SPA. By using a <b>Machine Learning surrogate model</b>, "
        "the application delivers instantaneous performance results (<2 ms) bypassing heavy numerical calculations "
        "whilst retaining high physical fidelity."
    )
    story.append(Paragraph(system_text, body_style))
    story.append(Spacer(1, 15))
    
    # ML Table specs
    ml_data = [
        [Paragraph("<b>Model Metric</b>", body_style), Paragraph("<b>Specification / Value</b>", body_style)],
        [Paragraph("Surrogate Model Type", body_style), Paragraph("Random Forest Regressor (150 Decision Trees)", body_style)],
        [Paragraph("Cross-Validation R² Score", body_style), Paragraph("0.981 (Excellent generalizability)", body_style)],
        [Paragraph("Root Mean Squared Error (RMSE)", body_style), Paragraph("0.38 g/kg dry air", body_style)],
        [Paragraph("Training Dataset Size", body_style), Paragraph("1540 numerical finite-difference runs", body_style)],
        [Paragraph("Surrogate Latency", body_style), Paragraph("< 2.0 milliseconds (instantly plots sweeps)", body_style)]
    ]
    ml_table = Table(ml_data, colWidths=[250, 400])
    ml_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#E9ECEF")),
        ('GRID', (0,0), (-1,-1), 1, colors.HexColor("#D6D9DE")),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(ml_table)
    story.append(PageBreak())
    
    # ----------------------------------------------------
    # SLIDE 7: Live URLs & Deployment Status
    # ----------------------------------------------------
    story.append(Paragraph("6. Project Deployment & Links", slide_header_style))
    story.append(Paragraph("LIVE PRODUCTION SERVERS AND NEXT RESEARCH PHASES", slide_subheading_style))
    story.append(Spacer(1, 15))
    
    story.append(Paragraph("The system has been pushed to a remote GitHub repository and deployed to production on Vercel:", body_style))
    story.append(Spacer(1, 10))
    
    links_data = [
        [
            Paragraph("<b>GitHub Source Repository</b>", body_style),
            Paragraph("<font color='#1E4E79'>https://github.com/MrRanjan-ui/desiccant-wheel-predictor</font>", body_style)
        ],
        [
            Paragraph("<b>Vercel Production Deployment</b>", body_style),
            Paragraph("<font color='#1E4E79'>https://desiccant-wheel-predictor.vercel.app</font>", body_style)
        ]
    ]
    links_table = Table(links_data, colWidths=[220, 450])
    links_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FFFFFF")),
        ('GRID', (0,0), (-1,-1), 1, colors.HexColor("#D6D9DE")),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 12),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(links_table)
    
    story.append(Spacer(1, 30))
    story.append(Paragraph("<b>Future Scope of the Lab Project:</b>", body_style))
    story.append(Paragraph("• Expose the Random Forest model via a REST API to support hardware controller integration.", bullet_style))
    story.append(Paragraph("• Run long-term system optimization using genetic algorithms to find the optimum RPM for hourly weather profiles.", bullet_style))
    
    # Build Document calling page decorations callbacks
    doc.build(story, onFirstPage=draw_slide_decorations, onLaterPages=draw_slide_decorations)

if __name__ == '__main__':
    output_path = "DESICCANT-WHEEL-PROJECT-PRESENTATION.pdf"
    build_presentation_pdf(output_path)
    print(f"Presentation PDF generated successfully at: {os.path.abspath(output_path)}")
